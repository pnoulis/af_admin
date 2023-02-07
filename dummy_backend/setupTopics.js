import { devMqttTopics } from "./mqttTopics.development";

const topics = {
  prod: [],
  dev: devMqttTopics,
};

function setupTopics(topicPreset) {
  if (!topics[topicPreset]) {
    throw new Error(`Undefined topic preset:${topicPreset}`);
  }
  return {
    stripToClient: () =>
      topics[topicPreset].map((route) => ({
        alias: route.alias,
        pub: route.sub?.topic || null,
        sub: route.pub?.topic || null,
      })),
    stripToServer: () =>
      topics[topicPreset].map((route) => ({
        alias: route.alias,
        pub: route.pub?.topic || null,
        sub: route.sub?.topic || null,
      })),
    toExplorerServer: () => topics[topicPreset],
    toExplorerClient: () =>
      topics.map(({ summary, alias, pub, sub }) => ({
        summary,
        alias,
        pub: sub || [],
        sub: pub || [],
      })),
  };
}

export { setupTopics };
