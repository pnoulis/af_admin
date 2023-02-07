import { topicsProduction } from "./topics.production.js";

const confProduction = {
  proxy: {
    name: "",
    id: "",
  },
  server: {
    host:
      `${import.meta.env?.VITE_REACT_APP_BROKER_PROTOCOL}://` +
      `${import.meta.env?.VITE_REACT_APP_BROKER_URL}:` +
      `${import.meta.env?.VITE_REACT_APP_BROKER_PORT}`,
    options: {
      username: import.meta.env?.VITE_REACT_APP_BROKER_USERNAME,
      password: import.meta.env?.VITE_REACT_APP_BROKER_PASSWORD,
    },
  },
  registry: {
    strict: true,
    topicsProduction,
    params: {
      clientId: "",
    },
  },
  logger: {
    verbosity: "warn",
  },
};

export { confProduction };
