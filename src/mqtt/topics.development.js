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

  // validate wristband
  {
    summary: "wristband validate",
    alias: "/wristband/isValid",
    pub: {
      topic: "/themaze/${clientId}/gui/player/isValid/response",
      alias: "/wristband/isValid/response",
      payloads: [
        {
          summary:
            "server successfully verifies incoming wristband is registered to user",
          data: {
            timestamp: 12345689,
            result: "OK",
            player: {
              id: "c324879-8798799-879879...",
              firstName: "pavlos",
              lastName: "noulis",
              username: "pnoulis",
              registeredWristbandNumber: 3,
            },
          },
        },
        {
          summary:
            "server fails to verify incoming wristband is registered to user",
          data: {
            timestamp: 12345689,
            result: "NOK",
            message: "player has already merged his wristband",
          },
        },
      ],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/player/isValid",
      alias: "/wristband/isValid",
      payloads: [
        {
          summary: "Client publishes his intent to verify a wristband",
          data: {
            timestamp: 123456789,
            wristbandNumber: 3,
          },
        },
      ],
    },
  },
  {
    summary: 'merge team',
    alias: '/team/merge',
    pub: {
      topic: '/themaze/${clientId}/gui/team/merge/response',
      alias: '/team/merge/response',
      payloads: [
        {
          summary: 'Server successfully merges the team',
          data: {
            timestamp: 123456789,
            result: 'OK',
            message: 'successfully create team',
          },
        },
      {
        summary: 'Server failes to create team because name is already registered',
        data: {
          timestamp: 123456789,
          result: 'NOK',
          message: 'team with this name already exist',
        },
      },
      ],
    },
    sub: {
      topic: '/themaze/${clientId}/gui/team/merge',
      alias: '/team/merge',
      payloads: [
        {
          summary: 'Client requests a new team to be created',
          data: {
            timestamp: 123456789,
            teamName: 'the_tigers',
            usernames: ["one", "two"],
          },
        },
      ],
    }
  }
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
