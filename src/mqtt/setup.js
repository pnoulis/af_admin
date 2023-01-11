import Client from './client.js';
import setupHooks from './useMqtt.js';
import Server from '/dummy_backend/mqttRoutes.js';

const CLIENTS = new Map();

const prodTopics = [
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
];

const msqTopics = Server.routesToClient();
// const msqTopics = [
//   {
//     alias: 'boot',
//     pub: '/themaze/booted',
//     sub: '/themaze/booted'
//   },
//   {
//     alias: 'wristband/scan',
//     pub: '/themaze/${clientId}/gui/player/wristbandScan',
//     sub: '/themaze/${clientId}/gui/player/wristbandScan'
//   },
//   {
//     alias: 'player/login',
//     pub: '/themaze/${clientId}/gui/player/login',
//     sub: '/themaze/${clientId}/gui/player/login',
//   },
//   {
//     alias: 'player/register',
//     pub: '/themaze/${clientId}/gui/player/register',
//     sub: '/themaze/${clientId}/gui/player/register',
//   },
//   {
//     alias: 'team/create',
//     pub: '/themaze/${clientId}/gui/team/merge',
//     sub: '/themaze/${clientId}/gui/team/merge',
//   },
//   {
//     alias: 'team/package/add',
//     pub: '/themaze/${clientId}/gui/team/package/add',
//     sub: '/themaze/${clientId}/gui/team/package/add',
//   }
// ];

const proxyPresets = [
]
const serverPresets = [
  { // PROD
    host: `${import.meta.env?.VITE_REACT_APP_BROKER_PROTOCOL}://` +
      `${import.meta.env?.VITE_REACT_APP_BROKER_URL}:` +
      `${import.meta.env?.VITE_REACT_APP_BROKER_PORT}`,
    options: {
      username: import.meta.env?.VITE_REACT_APP_BROKER_USERNAME,
      password: import.meta.env?.VITE_REACT_APP_BROKER_PASSWORD,
    }
  },
  { // DEV
    host: 'ws://192.168.100.187:9001',
    options: {
      username: 'pavlos',
      password: 'mindtr@p',
    },
    //dd
  },
  { // MSQ
    host: 'ws://test.mosquitto.org:8080',
    options: {
    }
  }
]
const registryPresets = [
  { // PROD
    strict: true,
    topics: [
      ...prodTopics,
    ]
  },
  { // DEV
    strict: false,
    topics: [
      ...prodTopics
    ]
  },
  { // MSQ
    strict: false,
    topics: [
      ...msqTopics
    ]
  }
]
const loggerPresets = [
]

function configureConf(proxyPreset, serverPreset,
                       registryPreset, loggerPreset, adhocConf) {
  return {
    proxy: { ...proxyPresets[proxyPreset], ...adhocConf?.proxy },
    server: { ...serverPresets[serverPreset], ...adhocConf?.server },
    registry: { ...registryPresets[registryPreset], ...adhocConf?.registry },
    logger: { ...loggerPresets[loggerPreset], ...adhocConf?.logger },
  };
}

function emulateLoad(client, interval = 3000) {
  const startLoad = () => {
    const topics = client.registry.registry;
    topics.forEach((value, key) => {
      const payload = {
        name: `origin:${client.id}`,
        pub: value.pub,
        sub: value.sub,
        data: new Date().toString(),
      }
      const params = client.registry.replaceParams(value.sub, {
      });
      client.publish(params, payload, (err) => {
        if (err) {
          console.log(err);
        }
      })
    })
  }

  const loop = setInterval(() => {
    startLoad();
  }, interval);

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    clearTimeout(loop);
  });

  setTimeout(() => clearTimeout(loop), 10 * interval);

  return 0;
}

function subscribeAll(client) {
  const topics = client.registry.registry;
  for (const topic of topics.keys()) {
    client.subscribe(topic, (payload) => {
      console.log(`PAYLOAD ARRIVED AT:${topic}`);
      console.log(payload);
    }, (err) => {
      if (err) {
        console.log(`SUBSCRIPTION ERROR AT:${topic}`);
        console.log(err);
      }
    });
  }
}

function testClient(client, loadInterval = 5000) {
  client.on('connect', () => {
    console.log(`client:${client.id} CONNECTED`);
    // emulateLoad(client, loadInterval);
    subscribeAll(client);
  })
    .on('error', (err) => {
      console.log(`client:${client.id} ERR: ${err.message}`);
    })
    .on('close', () => {
      console.log(`client:${client.id} CLOSED`);
    })
    .on('reconnect', () => {
      console.log(`client:${client.id} RECONNECTED`);
    })
    .on('offline', () => {
      console.log(`client:${client.id} OFFLINE`);
    })
    .on('disconnect', () => {
      console.log(`client:${client.id} DISCONNECTED`);
    });
}

export default function setupClient(test = false, name = 'msq', type, config = {}) {
  let conf = {};
  conf.name = name || import.meta.env.MODE;
  let client = CLIENTS.get(conf.name);
  if (client) {
    if (test) {
      testClient(client);
    }
    return {useMqtt: setupHooks(client), client};
  }

  const DEV = 0, PROD = 1, MSQ = 2;
  switch (type || import.meta.env.MODE) {
  case 'development':
    console.log('MQTT CLIENT RUNNING ON MSQ MODE');
    conf = configureConf(MSQ, MSQ, MSQ, MSQ, config);
    conf.name = name || import.meta.env.MODE;
    // console.log('MQTT CLIENT RUNNING ON DEV MODE');
    // conf = configureConf(DEV, DEV, DEV, DEV, config);
    // conf.name = name || import.meta.env.MODE;
    break;
  case 'production':
    console.log('MQTT CLIENT RUNNING ON PRODUCTION MODE');
    conf = configureConf(PROD, PROD, PROD, PROD, config);
    conf.name = name || import.meta.env.MODE;
    break;
  case 'msq':
    console.log('MQTT CLIENT RUNNING ON MSQ MODE');
    conf = configureConf(MSQ, MSQ, MSQ, MSQ, config);
    conf.name = name || import.meta.env.MODE;
    break;
  default:
    throw new Error(`Undefined client type:${type || import.meta.env.MODE}`);
  }

  client = new Client(conf);
  CLIENTS.set(conf.name, client);

  client.registry.params = {
    clientId: client.id
  };

  client.start();
  if (test) {
    testClient(client);
  }

  return {useMqtt: setupHooks(client), client};
}
