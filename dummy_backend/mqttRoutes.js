const topics = [
  {
    // one way communication, server publishes
    summary: "wristband scan",
    alias: "/wristband/scan",
    pub: {
      topic: "/themaze/${clientId}/gui/player/wristbandScan",
      alias: "/wristband/scan",
      payloads: [
        {
          summary: "A wristband has been scanned",
          data: {
            timestamp: 123456789,
            result: "OK",
            wristbandNumber: 10,
            wristbandColor: 1,
          },
        },
      ],
    },
  },
  {
    summary: "wristband register",
    alias: "/wristband/register",
    pub: {
      topic: "/themaze/${clientId}/gui/player/registerWristband/response",
      alias: "/wristband/register/response",
      payloads: [
        {
          summary:
            "server accepts requested pairing between wristband and player",
          data: {
            timestamp: 123456789,
            result: "OK",
            message: "successfully registered wristband to player",
          },
        },
        {
          summary:
            "server rejects requested pairing between wristband and player",
          data: {
            timestamp: 123456789,
            result: "NOK",
            message: "Wristband already assigned",
          },
        },
      ],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/player/registerWristband",
      alias: "/wristband/register",
      payloads: [
        {
          summary: "Client requests pairing between wristband and player",
          data: {
            timestamp: 123456789,
            username: "player username",
            wristbandNumber: 3,
          },
        },
      ],
    },
  },
];

const Topics = {
  toClient() {
    return topics.map((route) => ({
      alias: route.alias,
      pub: route.sub?.topic || null,
      sub: route.pub?.topic || null,
    }));
  },
  toServer() {
    return topics.map((route) => ({
      alias: route.alias,
      pub: route.pub?.topic || null,
      sub: route.sub?.topic || null,
    }));
  },
  toExplorer() {
    return topics;
  },
};

export { Topics };
