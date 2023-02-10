// From the Perspective of the server
const devMqttTopics = [
  {
    // Login Player
    summary: "login player",
    alias: "/player/login",
    pub: {
      topic: "/themaze/${clientId}/gui/player/login/response",
      alias: "/player/login",
      payloads: [],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/player/login",
      alias: "/player/login",
      payloads: [],
    },
  },
  {
    // Register Player
    summary: "Register player",
    alias: "/player/register",
    pub: {
      topic: "/themaze/${clientId}/gui/player/register/response",
      alias: "/player/register",
      payloads: [],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/player/register",
      alias: "/player/register",
      payloads: [],
    },
  },
  {
    // Create a client Id
    summary: "Create a unique channel between client and server",
    alias: "boot",
    pub: {
      topic: "/themaze/booted/${clientId}",
      alias: "boot",
      payloads: [],
    },
    sub: {
      topic: "/themaze/booted",
      alias: "boot",
      payloads: [],
    },
  },
  {
    // scan wristband
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
    // register wristband
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

const topics = {
  prod: [],
  dev: devMqttTopics,
};

function topicsDevelopment(topicsPreset) {
  if (!topics[topicsPreset]) {
    return null;
  }
  return {
    stripToClient: () =>
      topics[topicsPreset].map((route) => ({
        alias: route.alias,
        pub: route.sub?.topic || null,
        sub: route.pub?.topic || null,
      })),
    stripToServer: () =>
      topics[topicsPreset].map((route) => ({
        alias: route.alias,
        pub: route.pub?.topic || null,
        sub: route.sub?.topic || null,
      })),
    toExplorerServer: () => topics[topicsPreset],
    toExplorerClient: () =>
      topics[topicsPreset].map(({ summary, alias, pub, sub }) => ({
        summary,
        alias,
        pub: sub || [],
        sub: pub || [],
      })),
  };
}

export { topicsDevelopment };
