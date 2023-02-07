import { Topics } from "../../dummy_backend/mqttRoutes.js";

const proxy = {
  prod: {},
  dev: {},
  msq: {},
};
const server = {
  prod: {
    host:
      `${import.meta.env?.VITE_REACT_APP_BROKER_PROTOCOL}://` +
      `${import.meta.env?.VITE_REACT_APP_BROKER_URL}:` +
      `${import.meta.env?.VITE_REACT_APP_BROKER_PORT}`,
    options: {
      username: import.meta.env?.VITE_REACT_APP_BROKER_USERNAME,
      password: import.meta.env?.VITE_REACT_APP_BROKER_PASSWORD,
    },
  },
  dev: {},
  msq: {
    host: "ws://test.mosquitto.org:8080",
  },
};
const registry = {
  prod: {
    strict: true,
    topics: [],
    params: {
      clientId: "",
    },
  },
  dev: {},
  msq: {
    strict: false,
    topics: Topics.toClient(),
    params: {
      clientId: "",
    },
  },
};
const logger = {
  prod: {},
  dev: {},
  msq: {
    verbosity: "trace",
  },
};

export { proxy, server, registry, logger };
