import Client from './client.js';

let clients = new Map();
function setup(name = "development", server = 1, registry = 1) {
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
      host: 'ws://test.mosquitto.org:8080',
      options: {
      }
    },
    {
      id: 'dummy',
    }
  ];

  const registries = [
    {
      strict: false,
      topics: [
      ],
    },
    {
      strict: false,
      topics: [
      ],
    }
  ];

  let client =  clients.get(name);
  if (!client) {
    client = new Client({
      name,
      server: servers[server],
      registry: registries[registry],
    });
    clients.set(name, client);
  }
  return client;
}

// export const prodClient = setup('production');
// export const devClient = setup('development');
// export const client = setup('production');
export const client = {};
export const msqClient = setup('mosquitto', 2);
