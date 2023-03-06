import { logger, cerror } from "/src/lib/index.js";

const ERR_NAME = "ERR_MQTT_REGISTRY";

function Registry(config = {}) {
  this.strict = config.strict;
  this.params = config.params;
  this.registry = new Map(
    config.topics.map(({ alias, pub, sub }) => [
      this.canonicalize(alias),
      {
        pub: this.canonicalize(pub),
        sub: this.canonicalize(sub),
      },
    ])
  );
}

/**
 * Tries to translate a malformed topic to conform to expected syntax.
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
    logger.warn(`Unregistered topic alias: ${alias}`);
  }
  const { pub, sub } = this.registry.get(topic) || { pub: topic, sub: topic };
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
        logger.error(
          cerror(`Missing parameter: '${match}' for topic`, ERR_NAME),
          params
        );
      }
      return param;
    });
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
};

export { Registry };
