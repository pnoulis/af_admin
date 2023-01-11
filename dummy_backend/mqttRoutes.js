const routes = [
  {
    // one way communication, server publishes
    summary: 'wristband scan',
    alias: 'wristband/scan',
    pub: {
      topic: '/themaze/${clientId}/gui/player/wristbandScan',
      payloads: [
        {
          summary: 'A wristband has been scanned',
          data: {
            timestamp: 123456789,
            result: 'OK',
            wristbandNumber: 10,
            wristbandColor: 1,
          }
        }
      ]
    }
  },
  {
    summary: 'wristband register',
    alias: 'wristband/validate',
    pub: {
      topic: '/themaze/${clientId}/gui/player/registerWristband',
      payloads: [
        {
          summary: 'server accepts requested pairing between wristband and player',
          data: {
            timestamp: 123456789,
            result: 'OK',
            message: 'successfully registered wristband to player'
          }
        },
        {
          summary: 'server rejects requested pairing between wristband and player',
          data: {
            timestamp: 123456789,
            result: 'NOK',
            message: 'Wristband already assigned',
          }
        }
      ]
    },
    sub: {
      topic: '/themaze/${clientId}/gui/player/registerWristband',
      payloads: [
        {
          summary: 'Client requests pairing between wristband and player',
          data: {
            timestamp: 123456789,
            username: 'player username',
            wristbandNumber: 3,
          }
        }
      ]
    },
  },
];

function routesToClient() {
  return routes.map((route) => {
    return {
      alias: route.alias,
      pub: route.sub?.topic || null,
      sub: route.pub?.topic || null,
    };
  });
}

const server = {
  routes,
  routesToClient,
};

export default server;
