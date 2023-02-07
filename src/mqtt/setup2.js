import { Proxy } from "./client2.js";
import * as confPresets from "./conf.js";

const CLIENTS = new Map();
const SERVERS = new Map();

function setupClient(
  name = import.meta.env.MODE,
  test = false,
  mode = import.meta.env.VITE_MQTT_SERVER,
  adhocConfig = {}
) {

  const existingClient = CLIENTS.get(name);
  if (existingClient) {
    return existingClient;
  }

  const conf = {
    proxy: {
      name,
      mode,
      ...confPresets.proxy[mode],
      ...adhocConfig.proxy
    },
    server: { ...confPresets.server[mode], ...adhocConfig?.server },
    registry: {
      ...confPresets.registry[mode],
      ...adhocConfig?.registry
    },
    logger: { ...confPresets.logger[mode], ...adhocConfig?.logger },
  };

  const client = new Proxy(conf);
  CLIENTS.set(name, client);
  client.registry.setParam("clientId", client.id);
  return client;
}

function setupServer(client, adhocConfig) {
  const existingServer = SERVERS.get(client.name);
  if (existingServer) {
    return existingServer;
  }

  const topics = Array.from(client.registry.registry).map(([alias, {pub, sub}]) => ({
    alias,
    pub: sub,
    sub: pub,
  }));
  const conf = {
    proxy: {
      name: client.name,
      mode: client.mode,
      id: client.id,
      ...confPresets.proxy[client.mode],
      ...adhocConfig,
    },
    server: { ...confPresets.server[client.mode], ...adhocConfig?.server },
    registry: { topics, ...adhocConfig?.registry },
    logger: { ...confPresets.logger[client.mode], ...adhocConfig?.logger },
  };

  const server = new Proxy(conf);
  SERVERS.set(server.name, server);
  server.registry.setParam('clientId', server.id);
  return server;
}

export { setupClient, setupServer };
