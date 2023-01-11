import { format as prettyFormat } from 'pretty-format';

function Registry(config, logger) {
  this.strict = config.strict;
  this.params = config.params;
  this.logger = logger;
  this.registry = new Map(
    config.topics.map(({alias, pub, sub}) => [
      this.canonicalize(alias),
      {
        pub: this.canonicalize(pub),
        sub: this.canonicalize(sub),
      }
    ])
  );
  this.logger.log('trace')('Completed topic registry setup', this);
  return this;
}

Registry.prototype.canonicalize = function(...topics) {
  topics = topics.map((topic, i) => {
    if (!topic) {
      this.logger.warn(`Failed to canonicalize topic:${topic}`);
      return null;
    }
    if (!topic.startsWith("/")) topic = "/" + topic;
    if (topic.endsWith("/")) topic = topic.slice(0, -1);
    topic = topic.replace(/\s/g, '');
    this.logger.trace(`Canonicalized topic:'${topics[i]}' -> '${topic}'`);
    return topics;
  });

  return topics.length > 1 ? topics : topics.pop();
}

Registry.prototype.resolve = function(alias) {
  let adhocParams = {};
  if (typeof alias === "object") {
    adhocParams = alias;
    alias = alias.alias;
    delete adhocParams.alias;
  }
  const topic = this.canonicalize(alias);
  if (!this.registry.has(topic)) {
    this.logger.log(this.strict ? 'error' : 'warn')(
    );
  }
  const { pub, sub } = this.registry.get(topic) || { pub: topic, sub: topic};
  this.logger.trace(`Resolved alias:${alias}`, pub, sub);
  return [
    topic,
    ...this.canonicalize(...this.replaceParams(pub, sub, adhocParams)),
  ];
}

Registry.prototype.replaceParams = function(...topics) {
  const params = typeof topics[topics.length - 1] === 'object'
        ? Object.assign({}, this.params, topics.pop())
        : this.params;

  topics = topics.map((topic, i) => {
    topic = topic.replace(/\${([a-z]*)}/gi, (match, param) => {
      if (!(param in params)) {
        this.logger.error(
          `Missing parameter:'${match}' for topic:'${topic}'`,
          params
        );
      }
      return params[param];
    });
    this.logger.trace(
      `Replaced parameters for topic:'${topics[i]}' -> '${topic}`
    );
  });
  return topics.length > 1 ? topics : topics.pop();
}

Registry.prototype.setParam = function(key, value) {
  this.params[key] = value;
  this.logger.trace(
    `Added parameter:'${key}' -> '${value}'`
  );
}

function Logger(config) {
  this.verbosity = this.level[config.verbosity];
}

Logger.prototype.level = {
  trace: 4,
  info: 3,
  warn: 2,
  error: 1,
  fatal: 0,
  silent: -1,
}

// Describing events showing step by step execution
Logger.prototype.trace = function(message, ...args) {
  if (this.level.trace > this.verbosity) return;
  console.log(prettyFormat(`TRACE: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
}
// Purely informative event, may be ignored during normal
// operation
Logger.prototype.info = function(message, ...args) {
  if (this.level.info > this.verbosity) return;
  console.log(prettyFormat(`INFO: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
}
// Unexpected behavior, but the application may continue
// with operations in a stable manner.
Logger.prototype.warn = function(message, ...args) {
  if (this.level.warn > this.verbosity) return;
  console.log(prettyFormat(`WARN: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
}
// One ore more components not functioning properly, preventing
// some functionality. Service continues to operate.
Logger.prototype.error = function(message, ...args) {
  if (this.level.error > this.verbosity) return;
  console.log(prettyFormat(`ERROR: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
}
// Application will cease to provide its services.
Logger.prototype.fatal = function(message, ...args) {
  if (this.level.error > this.verbosity) return;
  console.log(prettyFormat(`FATAL: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
}

Logger.prototype.log = function(level) {
  return this[level].bind(this);
}


export default function Proxy(config = {}) {
  const { proxy, server, registry, logger } = this.parseConfig(config);
  this.name = proxy.name;
  this.id = proxy.id;
  this.server = server;
  this.logger = new Logger(logger);
  this.registry = new Registry(registry, new Logger(logger));
  this.logger.info('Completed setup\nConfiguration:', {
    proxy,
    server,
    registry,
    logger,
  });
  return this;
}

Proxy.prototype.parseConfig = function(config) {
  const proxy = {
    name: config.name || 'mqtt_proxy',
  };
  proxy.id = proxy.name.concat('_', Math.random().toString(16).slice(2.8));
  return {
    proxy,
    server: {
      host: config.server?.host,
      options: {
        keepalive: 30,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: false,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000, // 30 seconds
        clientId: proxy.id,
        ...config.server?.options,
      },
    },
    registry: {
      strict: config.registry?.hasOwnProperty('strict')
      ? config.registry.strict
        : true,
      topics: config.registry?.topics || [],
      params: config.registry?.params || {},
    },
    logger: {
      verbosity: config.logger?.verbosity || 'trace',
      ...config.logger,
    }
  };
}

Proxy.prototype.decode = function(payload) {
  try {
    payload = payload.toString();
    payload = JSON.parse(payload);
  } catch (err) {
    this.logger.error('Failed to decode payload:', payload, err);
    throw err;
  }
  this.logger.trace('Decoded payload:', payload);
  return payload;
}

Proxy.prototype.encode = function(payload) {
  try {
    if (typeof payload !== 'object') {
      throw new Error(`Non Object payload: ${payload}`);
    }
    payload = JSON.stringify(payload);
  } catch (err) {
    this.logger.error('Failed to encode payload', payload, err);
    throw err;
  }
  payload.timestamp = new Date().getTime();
  this.logger.trace('Encoded payload:', payload);
  return payload;
}

Proxy.prototype.subscribe = function(alias, client, cb) {
}

Proxy.prototype._subscribe = function(sub, client, options) {
  this.server.subscribe(sub, options, (err) => {
    if (err) {
      this.logger.fatal(
        `Failed to subscribe client:'${client.id}' to topic:'${sub}'`
      );
    }
    this.logger.trace(`Subscribed client:'${client.id}' to topic:${sub}`);
    this.server.on('message', (topic, message) => {
      this.logger.trace(`Received message for topic:${topic}`, message);
      if (topic === sub) {
        this.subscriptions.get(sub).forEach(
          (client) => {
            this.logger.trace(
              `Found client:${client.id} for message:`,
              message
            );
            if (!('cb' in client)) {
              this.logger.error(
                `Missing callback for client:${client.id}`,
                message
              );
            }
            client.cb(null, this.decode(message));
            this.logger.trace(
              `Successfully delivered message to client:${client.id}`,
              message
            );
          }
        );
      }
    });
  });
}

Proxy.prototype.registerClient = function(sub, client) {
  const clients = this.subscriptions.get(sub) || [];
  const newClient = {
    id: new Date().getTime(),
    cb: client,
  };
  clients.push(newClient);
  this.logger.trace(
    `Successfully registered client:${newClient.id} to topic:${sub}`,
    clients
  );
  return newClient;
}

Proxy.prototype.unregisterClient = function(sub, clientId) {
  const clients = this.subscriptions.get(sub);
  if (!clients.length) {
    this.logger.warn(
      `Trying to unregister client:'${clientId} where none is registered`
    );
  }
  const client = clients.findIndex(client => client.id === clientId);

  if (clientId === -1) {
    this.logger.warn(`Failed to unregister missing client:'${clientId}'`);
  }
  clients.splice(client, 1);
  this.logger.trace(`Successfully unregistered client:'${clientId}'`, clients);
}

Proxy.prototype.publish = function(alias, payload, options, cb) {
  const [topic, pub, sub] = this.registry.resolve(alias);
  if (options instanceof Function) {
    cb = options;
    options = {};
  }

  if (!(cb instanceof Function)) {
    this.logger.error(
      'Client failed to provide callback',
      { alias, payload, options, cb, }
    );
  }

  const client = this.registerClient(sub, cb);
  this._subscribe(sub, client, options);
  this._publish(pub, payload, options, client);
}

Proxy.prototype._publish = function(pub, payload, options, client) {
  if (options instanceof Function) {
    client = options;
    options = {};
  }

  if (!pub) {
    this.logger.warn(`Failed to publish to unknown topic:'${pub}'`);
  }
  this.server.publish(pub, this.encode(payload), options, (err) => {
    if (err) {
      this.logger.error(
        `Server error trying to publish to topic:'${pub}`,
        err
      );
    }
  });
}
