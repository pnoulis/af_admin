import { connect as MqttServer } from "precompiled-mqtt";

function Registry(config) {
  this.strict = config.strict;
  this.params = config.params;
  this.registry = new Map(
    config.topics.map((topic) => [
      this.canonicalize(topic.alias),
      {
        pub: this.canonicalize(topic.pub || topic.alias),
        sub: this.canonicalize(topic.sub || topic.alias),
      },
    ])
  );
  return this;
}

Registry.prototype.canonicalize = function (...topics) {
  // must conform to the syntax: /[a-zA-Z0-9]/[a-zA-Z0-9]
  topics = topics.map((topic) => {
    if (!topic) return null;
    if (!topic.startsWith("/")) topic = "/" + topic;
    if (topic.endsWith("/")) topic = topic.slice(0, -1);
    return topic;
  });

  return topics.length > 1 ? topics : topics.pop();
};

Registry.prototype.resolve = function (alias) {
  let adhocParams = {};
  if (typeof alias === "object") {
    adhocParams = alias;
    alias = alias.alias;
    delete adhocParams.alias;
  }
  const topic = this.canonicalize(alias);
  if (this.strict && !this.registry.has(topic)) {
    throw new Error(`No registry entry for topic:${topic}`);
  }
  const { pub, sub } = this.registry.get(topic) || { pub: topic, sub: topic };

  return [
    topic,
    ...this.canonicalize(...this.replaceParams(pub, sub, adhocParams)),
  ];
};

Registry.prototype.replaceParams = function (...topics) {
  const params =
    typeof topics[topics.length - 1] === "object"
      ? Object.assign({}, this.params, topics.pop())
      : this.params;

  topics = topics.map((topic) =>
    topic.split(/\//).reduce((car, cdr) => {
      if (!cdr.startsWith("$")) return car + cdr + "/";
      const param = params[cdr.slice(2, -1)];
      if (!param)
        throw new Error(`Missing parameter:${cdr} for topic:${topic}`);
      return car + param + "/";
    })
  );
  return topics.length > 1 ? topics : topics.pop();
};

export default function Proxy(config = {}) {
  const { proxy, server, registry, logger } = this.parseConfig(config);
  this.name = proxy.name;
  this.id = proxy.id;
  this.server = server;
  this.logger = logger;
  this.registry = new Registry(registry);
  this.events = new Map([
    ["connect", []],
    ["error", []],
    ["close", []],
    ["reconnect", []],
    ["offline", []],
    ["disconnect", []],
  ]);
  this.subscriptions = new Map();
  return this;
}

Proxy.prototype.parseConfig = function (config) {
  const proxy = { name: config.name || "mqtt" };
  proxy.id =
    proxy.id || proxy.name.concat("_", Math.random().toString(16).slice(2, 8));
  return {
    proxy,
    server: {
      host: config.server?.host,
      options: {
        keepalive: 30,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: false,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000, // 30 seconds
        clientId: proxy.id,
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
    },
  };
};

Proxy.prototype.decode = function (payload) {
  try {
    payload = payload.toString();
    payload = JSON.parse(payload);
  } catch (err) {
    throw err;
  }
  return payload;
};

Proxy.prototype.encode = function (payload) {
  try {
    payload = JSON.stringify(payload);
  } catch (err) {
    throw err;
  }
  return payload;
};

Proxy.prototype.start = function () {
  this.server = MqttServer(this.server.host, this.server.options)
    .on("connect", () => {
      this.events.get("connect")?.forEach((listener) => listener && listener());
      this.events.set("connect", []);
    })
    .on("error", (err) => {
      this.events
        .get("error")
        ?.forEach((listener) => listener && listener(err));

      this.events.set("error", []);
    })
    .on("close", () => {
      this.events.get("close")?.forEach((listener) => listener && listener());

      this.events.set("close", []);
    })
    .on("reconnect", () => {
      this.events
        .get("reconnect")
        ?.forEach((listener) => listener && listener());

      this.events.set("reconnect", []);
    })
    .on("offline", () => {
      this.events.get("offline")?.forEach((listener) => listener && listener());

      this.events.set("offline", []);
    })
    .on("disconnect", () => {
      this.events
        .get("disconnect")
        ?.forEach((listener) => listener && listener());
      this.events.set("disconnect", []);
    });
  return this;
};

Proxy.prototype.stop = function (force = false, options = {}, cb) {
  if (typeof force === "function") {
    cb = force;
    force = false;
  } else if (typeof options === "function") {
    cb = options;
    options = {};
  }
  this.server.end(force, options, cb);
  return this;
};

Proxy.prototype.on = function (event, listener) {
  this.events.get(event).push(listener);
  return this;
};

Proxy.prototype.subscribe = function (alias, client, cb) {
  const [topic, pub, sub] = this.registry.resolve(alias);
  let clients = this.subscriptions.get(topic);
  if (!clients) {
    clients = [];
    this._subscribe(sub, cb);
    this.subscriptions.set(topic, clients);
    this.server.on("message", (topic, payload) => {
      if (topic === sub) {
        clients.forEach((client) => client && client(this.decode(payload)));
      }
    });
  }

  const clientId = clients.push(client || null) - 1;

  if (!client) {
    var defer = (client) => (clients[clientId] = client);
  }

  return {
    unsubscribe: () => clients.splice(clientId, 1),
    publish: (payload, options, cb) => this._publish(pub, payload, options, cb),
    subscribe: defer,
  };
};

Proxy.prototype._subscribe = function (sub, options, cb) {
  if (options instanceof Function) {
    cb = options;
    options = {};
  }

  this.server.subscribe(sub, options, (err) => {
    cb && cb(err);
    if (err) {
      throw new Error(err);
    }
  });
};

Proxy.prototype.publish = function (alias, payload, options, cb) {
  const [topic, pub, sub] = this.registry.resolve(alias);
  if (options instanceof Function) {
    cb = options;
    options = {};
  }
  this._publish(pub, payload, options, cb);
};

Proxy.prototype._publish = function (pub, payload, options, cb) {
  if (options instanceof Function) {
    cb = options;
    options = {};
  }
  if (!pub) {
    throw new Error("Server does not accept requests for that topic");
  }

  payload.timestamp = new Date().getTime();
  this.server.publish(pub, this.encode(payload), options, (err) => {
    cb && cb(err);
    if (err) {
      throw new Error(err);
    }
  });
};
