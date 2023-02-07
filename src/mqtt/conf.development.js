const confDevelopment = {
  /*
    DEVELOPMENT CONFIGURATION
   */
  dev: {
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
      topics: [],
      params: {
        clientId: "",
      },
    },
    logger: {
      verbosity: "trace",
    },
  },

  /*
    MSQ CONFIGURATION
   */
  msq: {
    proxy: {
      name: "",
      id: "",
    },
    server: {
      host: "ws://test.mosquitto.org:8080",
    },
    registry: {
      strict: false,
      topics: [],
      params: {
        clientId: "",
      },
    },
    logger: {
      verbosity: "trace",
    },
  },
};

export { confDevelopment };
