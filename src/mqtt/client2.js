import { format as prettyFormat } from "pretty-format";
import { connect as MqttServer } from "precompiled-mqtt";

function Registry(config, logger) {
  this.strict = config.strict;
  this.params = config.params;
  this.logger = logger;
  this.registry = new Map(
    config.topics.map(({ alias, pub, sub }) => [
      this.canonicalize(alias),
      {
        pub: this.canonicalize(pub),
        sub: this.canonicalize(sub),
      },
    ])
  );
  this.logger.log("trace")("Completed topic registry setup", this);
  return this;
}

/**
 * Transforms a topic to conforming syntax in case of omissions.
 *
 * @param {...string} topics
 * @returns {string|string[]}
 */
Registry.prototype.canonicalize = function (...topics) {
  topics = topics.map((topic, i) => {
    if (topic == null) {
      return null;
    }
    if (!topic.startsWith("/")) topic = "/" + topic;
    if (topic.endsWith("/")) topic = topic.slice(0, -1);
    topic = topic.replace(/\s/g, "");
    this.logger.trace(`Canonicalized topic:'${topics[i]}' -> '${topic}'`);
    return topic;
  });

  return topics.length > 1 ? topics : topics.pop();
};

/**
 * Resolve a topic alias. A topic alias is 'resolved' to
 * produce:
 *
 * [0] - the topic alias after canonicalization.
 * [1] - the topic to publish to. named pub
 * [2] - the topic to subscribe to. named sub
 *
 * In case of an unregistered topic alias each member of the return array
 * is equal to the topic alias after canonicalization.
 *
 * [0] - the topic alias after canonicalization.
 * [1] - the topic alias after canonicalization.
 * [2] - the topic alias after canonicalization.
 *
 * If the registry is operating in strict mode an unregistered topic
 * alias throws an Error.
 *
 * @param {string} alias
 *
 * @throws {Error} Unregistered topic alias
 * @returns {string[]}
 */
Registry.prototype.resolve = function resolve(alias) {
  let adhocParams = {};
  if (typeof alias === "object") {
    adhocParams = alias;
    alias = alias.alias;
    delete adhocParams.alias;
  }
  const topic = this.canonicalize(alias);
  if (!this.registry.has(topic)) {
    this.logger.log(this.strict ? "error" : "warn")(
      `Unregistered topic alias:${alias}`
    );
  }
  const { pub, sub } = this.registry.get(topic) || { pub: topic, sub: topic };
  this.logger.trace(`Resolved alias:${alias}`, pub, sub);
  return [
    topic,
    ...this.canonicalize(...this.replaceParams(pub, sub, adhocParams)),
  ];
};

/**
 * Replace possible parameters within a topic if any match
 * with those registered.
 *
 * A topic parameter of the form ${[a-z]*} part of a topic:
 * /mytopic/${param}/go/on
 * is to be replaced by the registered parameter value if any.
 *
 * @param {...string|Array.<...string, object>} topics
 * @returns {string|string[]}
 */
Registry.prototype.replaceParams = function (...topics) {
  const params =
    typeof topics[topics.length - 1] === "object"
      ? Object.assign({}, this.params, topics.pop())
      : this.params;

  topics = topics.map((topic, i) => {
    if (topic == null) {
      return null;
    }
    topic = topic.replace(/\${([a-z]*)}/gi, (match, param) => {
      param = params[param];
      if (!param) {
        this.logger.error(
          `Missing parameter:'${match}' for topic:'${topic}'`,
          params
        );
      }
      return param;
    });
    this.logger.trace(
      `Replaced parameters for topic:'${topics[i]}' -> '${topic}`
    );
    return topic;
  });
  return topics.length > 1 ? topics : topics.pop();
};

/**
 * Register a topic parameter key and value.
 *
 * @param {string} key
 * @param {*} value - should be a string though.
 *
 * @TODO the type of 'value' ought to be restricted to a string.
 */
Registry.prototype.setParam = function (key, value) {
  this.params[key] = value;
  this.logger.trace(`Added parameter:'${key}' -> '${value}'`);
};

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
};

// Describing events showing step by step execution
Logger.prototype.trace = function (message, ...args) {
  if (this.level.trace > this.verbosity) return;
  console.log(prettyFormat(`TRACE: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(args));
  }
};
// Purely informative event, may be ignored during normal
// operation
Logger.prototype.info = function (message, ...args) {
  if (this.level.info > this.verbosity) return;
  console.log(prettyFormat(`INFO: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
};
// Unexpected behavior, but the application may continue
// with operations in a stable manner.
Logger.prototype.warn = function (message, ...args) {
  if (this.level.warn > this.verbosity) return;
  console.log(prettyFormat(`WARN: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
};
// One ore more components not functioning properly, preventing
// some functionality. Service continues to operate.
Logger.prototype.error = function (message, ...args) {
  if (this.level.error > this.verbosity) return;
  console.log(prettyFormat(`ERROR: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
};
// Application will cease to provide its services.
Logger.prototype.fatal = function (message, ...args) {
  if (this.level.error > this.verbosity) return;
  console.log(prettyFormat(`FATAL: ${message}`));
  if (args.length > 0) {
    console.log(prettyFormat(...args));
  }
};

Logger.prototype.log = function (level) {
  return this[level].bind(this);
};

function Proxy(config = {}) {
  const { server, registry, logger } = this.parseConfig(config);
  this.subscriptions = new Map();
  this.server = server;
  this.logger = new Logger(logger);
  this.registry = new Registry(registry, new Logger(logger));
  this.logger.info("Completed setup\nConfiguration:", {
    name: this.name,
    id: this.id,
    server,
    registry,
    logger,
  });
  return this;
}

Proxy.prototype.parseConfig = function (config) {
  this.name = config.proxy.name || "mqtt_proxy";
  this.id =
    config.proxy.id ||
    config.proxy.name.concat("_", Math.random().toString(16).slice(2, 8));
  return {
    server: {
      host: config.server?.host,
      options: {
        keepalive: 30,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: false,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000, // 30 seconds
        clientId: config.proxy.name.concat(
          "_",
          Math.random().toString(16).slice(2, 8)
        ),
        ...config.server?.options,
      },
    },
    registry: {
      strict: config.registry?.hasOwnProperty("strict")
        ? config.registry.strict
        : true,
      topics: config.registry?.topics || [],
      params: config.registry?.params || {},
    },
    logger: {
      ...config.logger,
      verbosity: config.logger?.verbosity || "trace",
    },
  };
};

Proxy.prototype.start = function () {
  this.server = MqttServer(this.server.host, this.server.options)
    .on("connect", () => {
      this.logger.info(`${this.name} connected`);
    })
    .on("error", () => {
      this.logger.error(`${this.name} disconnection error`);
    });
  return this.server;
};

Proxy.prototype.stop = function () {
  this.server?.end(true);
};

Proxy.prototype.decode = function (payload) {
  try {
    payload = JSON.parse(payload);
  } catch (err) {
    this.logger.error("Failed to decode payload:", payload, err);
    throw err;
  }
  this.logger.trace("Decoded payload:", payload);
  return payload;
};

Proxy.prototype.encode = function (payload) {
  if (typeof payload !== "object") {
    this.logger.error("Non object payload", payload);
  }
  try {
    payload.timestamp = new Date().getTime();
    payload = JSON.stringify(payload);
  } catch (err) {
    this.logger.error("Failed to encode payload", payload, err);
    throw err;
  }
  this.logger.trace("Encoded payload:", payload);
  return payload;
};

Proxy.prototype.subscribe = function (alias, options, cb) {
  if (options instanceof Function) {
    cb = options;
    options = {};
  }
  const [topic, pub, sub] = this.registry.resolve(alias);

  const client = this._subscribe(sub, cb, options);
  return () => this.unregisterClient(sub, client.id);
};

Proxy.prototype._subscribe = function (
  sub,
  client,
  transient = false,
  options
) {
  if (this.subscriptions.has(sub)) {
    return this.registerClient(sub, client, transient);
  }

  const clients = [];
  this.subscriptions.set(sub, clients);

  this.server.subscribe(sub, options, (err) => {
    if (err) {
      clients.forEach((client) => {
        this.logger.fatal(
          `Failed to subscribe client:'${client.id}' to topic:'${sub}'`
        );
        client.cb(err);
      });
    }

    this.logger.trace(`Subscribed to topic:${sub}`);
    this.server.on("message", (topic, message) => {
      this.logger.trace(`Received message for topic:${topic}`);
      const unregister = [];
      if (topic === sub) {
        clients.forEach((client) => {
          if (client.transient) {
            unregister.push(client.id);
          }
          client.cb(null, this.decode(message));
          this.logger.trace(
            `Successfully delivered message to client:${client.id}`
          );
        });
        unregister.forEach((clientId) => this.unregisterClient(sub, clientId));
      }
    });
  });

  return this.registerClient(sub, client);
};

Proxy.prototype.registerClient = function (sub, cb, transient = false) {
  const clients = this.subscriptions.get(sub);
  const client = {
    id: new Date().getTime(),
    cb,
    transient,
  };

  clients.push(client);
  this.logger.trace(
    `Successfully registered client:${client.id} to topic:${sub}`,
    clients
  );
  return client;
};

Proxy.prototype.unregisterClient = function (sub, clientId) {
  const clients = this.subscriptions.get(sub);
  if (!clients.length) {
    this.logger.warn(
      `Trying to unregister client:'${clientId} where none is registered`
    );
  }
  const client = clients.findIndex((client) => client.id === clientId);

  if (clientId === -1) {
    this.logger.warn(`Failed to unregister missing client:'${clientId}'`);
  }
  clients.splice(client, 1);
  this.logger.trace(`Successfully unregistered client:'${clientId}'`, clients);
};

Proxy.prototype.publish = function (alias, payload, options, cb) {
  if (options instanceof Function) {
    cb = options;
    options = {};
  }
  const [topic, pub, sub] = this.registry.resolve(alias);

  let client = null;
  if (cb instanceof Function) {
    client = this._subscribe(sub, cb, true, options);
  }

  this._publish(pub, payload, options, client);
};

Proxy.prototype._publish = function (pub, payload, options, client) {
  if (!pub) {
    this.logger.warn(`Failed to publish to unknown topic:'${pub}'`);
  }
  this.server.publish(pub, this.encode(payload), options, (err) => {
    if (err) {
      this.logger.error(`Server error trying to publish to topic:'${pub}`, err);
      client.cb(err);
    }
    this.logger.trace(`Server successfully published to topic:${pub}`, payload);
  });
};

export { Proxy };
