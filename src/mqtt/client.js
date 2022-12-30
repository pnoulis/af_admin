import { connect as MqttServer } from 'precompiled-mqtt';
// General information
// A *Topic* is considered registered if it is a member of the *registry map*.
// The *registry map* maps *Aliases* to *Topics*. However, the user needs not
// provide an Alias for each Topic, in which case the key of the Topic becomes
// the Topic itself.

// Default behavior:
// By default each subscription shall first perform topic resolution.
// The topic parser will try and match the Alias to the Topic.
// If the Topic is found in the registry with a registered Alias
// then the Topic is returned in the place of the Alias.
// If the Topic is found in the registry but no Alias has been mapped
// then the Topic is returned as is.

// Options:

// *strict*: [true | false] default: false
// If true then the parser shall expect each Topic provided
// to have been registered. If the Topic fails to meet that
// condition then an Error is thrown.

// The user can provide instructions to the topic parser individually on each
// subscription.
// A topic with an instruction attached is of the form:
// ----> \instruction\/topic/path
// The following characters are to be interpreted specially if found
// within the instruction block of a topic if any.
// r -> dont have to be in the registry
// p -> literally, perform no parsing of any kind

function Registry(config) {
  this.registry = new Map(config.topics.map(topic => [
    topic.alias,
    {
      pub: topic.pub,
      sub: topic.sub,
    }
  ]));
  this.strict = config.strict;
}

Registry.prototype.resolve = function (topic, id) {
  if (this.strict && !this.registry.has(topic)) {
    throw new Error(`No registry entry for topic:${topic}`);
  }

  let { pub, sub } = this.registry.get(topic) || { pub: topic, sub: topic };

  pub = pub.replace(/\${clientId}/, id);
  sub = sub.replace(/\${clientId}/, id);

  return { pubpath : pub, subpath: sub }
};

export default function MqttClient(config) {
  this.name = config.name;
  this.id = config.id;
  const { server, registry } = this.parseConfig(config);
  this.server = server;
  this.start = (mode, topics) => {
    this.server = MqttServer(server.host, server.options)
      .on('connect', () => {
        console.log(`Broker:${this.name} successfully connected`);
        if (mode === 'test') {
          setTimeout(() => this.dummyServer(topics), 1000);
        }
      })
      .on('reconnect', () => console.log(`Client:${this.name} trying to reconnect`))
      .on('error', (err) => console.log(`Client:${this.name} error: ${err}`))
      .on('close', () => console.log(`Client:${this.name} closed`))
      .on('offline', () => console.log(`Client:${this.name} offline`))
      .on('disconnect', (packet) => console.log(`Client:${this.name} disconnected`));
  }
  this.subscriptions = new Map();
  this.registry = new Registry(registry);
}

MqttClient.prototype.parseConfig = function (config) {
  return {
    server: {
      host: config?.server?.host,
      options: {
        keepalive: 30,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: false,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000, // 30 seconds
        clientId: this.id,
        ...config?.server?.options,
      }
    },
    registry: {
      topics: config.registry.topics || [],
      strict: config.registry.hasOwnProperty('strict')
        ? config.registry.strict
        : true,
    },
    errorHandler: config.errorHandler
  };
};

MqttClient.prototype.dummyServer = function (...topics) {
  if (topics.length === 0) {
    topics = Array.from(this.registry.registry.values());
  }

  const message = (i) => {
    return JSON.stringify(`dummy server:${this.name} TEST MESSAGE`);
  };
  const onErr = (topic, msg, err) => {
    if (err) {
      console.log(`server:${this.name} ${msg} ${err?.message}`);
    } else {
      console.log(`server:${this.name} published message:${msg} at topic:${topic}`);
    }
  };
  const publish = () => {
    topics.forEach((topic, i) => {
      this.server.publish(topic, message(i), (err) => onErr(topic, message(i), err));
    })
  }

  const fire = () => {
    const interval = 3000;
    const start = () => publish();
    const loopId = setInterval(start, interval);
    const stop = () => {
      clearTimeout(loopId);
    }
    //Release event handler
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      stop();
    });
    setTimeout(stop, 10 * interval);
  }

  if (this.server.connected) {
    console.log(`Server:${this.name} successfully connected`);
    fire();
  } else {
    this.start().on('connect', () => {
      console.log(`Server:${this.name} successfully connected`);
      fire();
    })
  }
}

MqttClient.prototype.dummyClient = function (...topics) {
  if (topics.length === 0) {
    topics = Array.from(this.registry.registry.values());
  }
  this.server
    .on('connect', () => {
      console.log(`client:${this.name} successfully connected`);
      topics.forEach(t => {
        this.server.subscribe(t, (err) => {
          if (err) {
            console.log(err);
            console.log(`client:${this.name} failed to subscribe to topic:${t}`);
            return;
          }
          console.log(`client:${this.name} successfully subscribed to topic:${t}`);
          this.server.on('message', (t, message) => {
            console.log(`New message:
client:${this.name}
topic:${t}
message:${message.toString()}`);
          });
        });
      })
    });
};

MqttClient.prototype.subscribe = function (event, handler, cb) {
  const { pubpath, subpath } = this.registry.resolve(event, this.id);
  let subscription = this.subscriptions.get(event);

  // setup subscription
  if (!subscription) {
    this._subscribe(subpath, cb);
    subscription = [];
    this.subscriptions.set(event, subscription);
    this.server.on('message', (topic, message) => {
      if (topic === subpath) {
        subscription.forEach(handler => handler && handler(message.toString()));
      }
    });
  }

  // register event handler
  const handlerId = subscription.push(handler) - 1;
  const unsubscribe = () => subscription.splice(handlerId, 1);
  const publish = (message, options, cb) => this._publish(pubpath, message, options, cb);

  return [unsubscribe, publish];
};

MqttClient.prototype._subscribe = function (subpath, cb) {
  this.server.subscribe(subpath, (err) => {
    if (err) {
      if (cb) cb(err);
      throw new Error(err);
    }
  });
};

MqttClient.prototype.publish = function (topic, message, options, cb) {
  topic = this.registry.resolve(topic, this.id);
  if (options instanceof Function) {
    cb ||= options;
    options = {};
  }
  this._publish(topic, message, options, cb)
  return 0;
};

MqttClient.prototype._publish = function (topic, message, options = {}, cb) {
  if (options instanceof Function) {
    cb ||= options;
    options = {};
  }
  this.server.publish(topic, JSON.stringify(message), options, (err) => {
    if (err) {
      if (cb) cb(err);
      throw new Error(err);
    } else {
      cb && cb(null);
    }
  });
};
