import Client from './client.js';

export default function setup(server = 1, registry = 1) {
  const url = import.meta.env?.VITE_REACT_APP_BROKER_URL;
  const port = import.meta.env?.VITE_REACT_APP_BROKER_PORT;
  const protocol = import.meta.env?.VITE_REACT_APP_BROKER_PROTOCOL;
  const host = `${protocol}://${url}:${port}`;
  const username = import.meta.env?.VITE_REACT_APP_BROKER_USERNAME;
  const password = import.meta.env?.VITE_REACT_APP_BROKER_PASSWORD;

  const servers = [
    { // production
      host,
      options: {
        username,
        password,
      }
    },
    { // development
      host: 'ws://192.168.100.187:9001',
      options: {
        username: 'pavlos',
        password: 'mindtr@p',
      }
    },
    {
      id: 'dummy',
    }
  ];

  const registries = [
    {
      strict: true,
      topics: [
      ],
    },
    {
      strict: true,
      topics: [
      ],
    }
  ];

  const client = new Client({
    server: servers[server],
    registry: registries[registry],
  });
  return client;
}
setup();
