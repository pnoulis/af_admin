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
    { // mosquitto
      host: 'ws://test.mosquitto.org:8080',
      options: {
      }
    },
    {
      id: 'dummy',
    }
  ];

  const common2 = [
    {
      alias: 'boot',
      pub: '/themaze/booted',
      sub: '/themaze/booted/${clientId}'
    },
    {
      alias: 'wristband/scan',
      pub: '/themaze/${clientId}/gui/player/wristbandScan',
      sub: '/themaze/${clientId}/gui/player/wristbandScan/response'
    },
    {
      alias: 'player/login',
      pub: '/themaze/${clientId}/gui/player/login',
      sub: '/themaze/${clientId}/gui/player/login/response',
    },
    {
      alias: 'player/register',
      pub: '/themaze/${clientId}/gui/player/register',
      sub: '/themaze/${clientId}/gui/player/register/response',
    },
    {
      alias: 'team/create',
      pub: '/themaze/${clientId}/gui/team/merge',
      sub: '/themaze/${clientId}/gui/team/merge/response',
    },
    {
      alias: 'team/package/add',
      pub: '/themaze/${clientId}/gui/team/package/add',
      sub: '/themaze/${clientId}/gui/team/package/add/response',
    }
  ]
  const commonTopics = [
    ["wristband/scan", "/themaze/${clientId}/gui/player/wristbandScan"],
    ["player/login", '/themaze/${clientId}/gui/player/login'],
    ["player/login/response", '/themaze/${clientId}/gui/player/login/response'],
  ]

  const registries = [
    {
      strict: false, // production
      topics: [
        ...common2
      ],
    },
    { // development
      strict: false,
      topics: [
        ...common2
      ],
    }
  ];

  let client = clients.get(name);
  if (!client) {
    client = new Client({
      name,
      id: `afadmin_${Math.random().toString(16).slice(2, 8)}`,
      server: servers[server],
      registry: registries[registry],
    });
    clients.set(name, client);
  }
  return client;
}

const prodClient = setup('production', 0, 0);
const devClient = setup('development', 1, 1);
const msqClient = setup('mosquitto', 2, 1);
export {
  prodClient as client,
  devClient,
  msqClient,
}
