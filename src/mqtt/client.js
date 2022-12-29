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
  this.registry = new Map(config.topics);
  this.strict = config.strict;
}

Registry.prototype.resolve = function(topic) {
  const registered = this.registry.get(topic);
  if (this.strict && !registered) {
    throw new Error(`No registry entry for topic:${topic}`);
  }
  return registered || topic;
};

export default function MqttClient(config) {
  const {server, registry} = this.parseConfig(config);
  this.subscriptions = new Map();
  this.registry = new Registry(registry);
}

MqttClient.prototype.parseConfig = function(config) {
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
        clientId: `mqttjs_${Math.random().toString(16).slice(2, 8)}`,
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

MqttClient.prototype.subscribe = function(event, handler) {
  let subscription = this.subscriptions.get(event);

  // setup subscription
  if (!subscription) {
    this._subscribe(event);
    subscription = [];
    this.subscriptions.set(event, subscription);
    this.server.on('message', (topic, message) => {
      subscription.forEach(handler => handler && handler(message));
    });
  }

  // register event handler
  const handlerId = subscription.push(handler) - 1;
  const unsubscribe = () => subscription.splice(handlerId, 1);
  const publish = (message, options) => this._publish(event, message, options);

  return [unsubscribe, publish];
};

MqttClient.prototype._subscribe = function(event) {
  this.server.subscribe(event, (err) => {
    if (err) throw new Error(err);
  });
};

MqttClient.prototype.publish = function() {
  return 0;
};

MqttClient.prototype._publish = function(topic, message, options = {}) {
  this.server.publish(topic, JSON.stringify(message), options, (err) => {
    if (err) throw new Error(err);
  });
};
