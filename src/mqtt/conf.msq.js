const msqConfig = {
  proxy: {
    id: "",
    name: "",
  },
  server: {
    host: "ws://test.mosquitto.org:8080",
  },
  registry: {
    strict: false,
    topics: "development",
    params: {
      clientId: "",
    },
  },
  logger: {
    verbosity: "trace",
  },
};
