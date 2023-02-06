import { Proxy } from "./client2.js";
import { Topics } from "../../dummy_backend/mqttRoutes.js";
import * as confPresets from "./conf.js";

const CLIENTS = new Map();
function setupClient(
  name = import.meta.env.MODE,
  test = false,
  server = false,
  type = import.meta.env.VITE_MQTT_SERVER,
  adhocConfig = {}
) {
  const existingClient = CLIENTS.get(name);
  if (existingClient) {
    return existingClient;
  }

  confPresets.registry[type].topics = server
    ? Topics.toServer()
    : Topics.toClient();

  const conf = {
    proxy: { ...confPresets.proxy[type], ...adhocConfig.proxy },
    server: { ...confPresets.server[type], ...adhocConfig?.server },
    registry: { ...confPresets.registry[type], ...adhocConfig?.registry },
    logger: { ...confPresets.logger[type], ...adhocConfig?.logger },
  };
  conf.name = name;

  const client = new Proxy(conf);
  CLIENTS.set(name, client);
  client.registry.setParam("clientId", client.id);
  return client;
}

export { setupClient };
