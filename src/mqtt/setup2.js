import { confProduction } from "./conf.production";
import { confDevelopment } from "./conf.development";
import { topicsDevelopment } from "./topics.development";
import { Proxy } from "./client2";

const PROXIES = new Map();
function setupMqttProxy({
  name = import.meta.env.MODE,
  test = false,
  ...config
} = {}) {
  if (PROXIES.has(name)) {
    return PROXIES.get(name);
  }

  switch (import.meta.env.MODE) {
    case "production":
      PROXIES.set(name, {
        client: new Proxy(confProduction),
      });
      break;
    case "development":
      const confPreset = import.meta.env.VITE_MQTT_CONF_PRESET;
      const topicsPreset = import.meta.env.VITE_MQTT_TOPICS_PRESET;
      if (!confPreset) {
        throw new Error("Missing environment variable: VITE_MQTT_CONF_PRESET");
      } else if (!confDevelopment[confPreset]) {
        throw new Error(`Undefined configuration preset:${confPreset}`);
      } else if (!topicsPreset) {
        throw new Error(
          "Missing environment variable: VITE_MQTT_TOPICS_PRESET"
        );
      } else if (!topicsDevelopment(topicsPreset)) {
        throw new Error(`Undefined topics preset:${topicsPreset}`);
      }

      const id = Math.random().toString(16).slice(2, 8);
      const client = new Proxy({
        proxy: {
          ...confDevelopment[confPreset].proxy,
          id,
          ...config?.proxy,
          name: `client-${name}`,
        },
        server: {
          ...confDevelopment[confPreset].server,
          ...config?.server,
        },
        registry: {
          ...confDevelopment[confPreset].registry,
          ...config?.registry,
          topics: [
            ...topicsDevelopment(topicsPreset).stripToClient(),
            ...(config?.registry?.topics || []),
          ],
          params: {
            clientId: id,
            ...(config?.registry?.params || {}),
          },
        },
        logger: {
          ...confDevelopment[confPreset].logger,
          ...config?.logger,
        },
      });
      const server = new Proxy({
        proxy: {
          ...confDevelopment[confPreset].proxy,
          id,
          ...config?.proxy,
          name: `server-${name}`,
        },
        server: {
          ...confDevelopment[confPreset].server,
          ...config?.server,
        },
        registry: {
          ...confDevelopment[confPreset].registry,
          ...config?.registry,
          topics: [
            ...topicsDevelopment(topicsPreset).stripToServer(),
            ...(config?.registry?.topics || []),
          ],
          params: {
            clientId: id,
            ...(config?.registry?.params || {}),
          },
        },
        logger: {
          ...confDevelopment[confPreset].logger,
          ...config?.logger,
        },
      });
      PROXIES.set(name, {
        client,
        server,
        explorer: topicsDevelopment(topicsPreset),
      });
      break;
    default:
      throw new Error(
        `Unrecognized value for environment variable MODE:${
          import.meta.env.MODE
        }`
      );
  }

  return PROXIES.get(name);
}

export { setupMqttProxy };
