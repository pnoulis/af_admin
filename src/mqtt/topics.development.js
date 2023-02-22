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
      topic: "/themaze/${clientId}/gui/player/registration/response",
      alias: "/player/register",
      payloads: [],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/player/registration",
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

  // Merge team
  {
    summary: "merge team",
    alias: "/team/merge",
    pub: {
      topic: "/themaze/${clientId}/gui/team/merge/response",
      alias: "/team/merge/response",
      payloads: [
        {
          summary: "Server successfully merges the team",
          data: {
            timestamp: 123456789,
            result: "OK",
            message: "successfully create team",
          },
        },
        {
          summary:
            "Server failes to create team because name is already registered",
          data: {
            timestamp: 123456789,
            result: "NOK",
            message: "team with this name already exist",
          },
        },
      ],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/team/merge",
      alias: "/team/merge",
      payloads: [
        {
          summary: "Client requests a new team to be created",
          data: {
            timestamp: 123456789,
            teamName: "the_tigers",
            usernames: ["one", "two"],
          },
        },
      ],
    },
  },

  // List packages
  {
    summary: "get packages",
    alias: "packages/list",
    pub: {
      topic: "themaze/${clientId}/gui/packages/all/response",
      alias: "/packages/list/response",
      payloads: [
        {
          summary: "Successfull listing of packages",
          data: {
            timestamp: 123456789,
            result: "OK",
            packages: [
              {
                name: "Per Time 5",
                amount: 5,
                type: "time",
                cost: 100,
              },
              {
                name: "Per Time 10",
                amount: 10,
                type: "time",
                cost: 200,
              },
              {
                name: "Per Time 15",
                amount: 15,
                type: "time",
                cost: 300,
              },
              {
                name: "Per Time 20",
                amount: 20,
                type: "time",
                cost: 400,
              },
              {
                name: "Per Mission 5",
                amount: 5,
                type: "mission",
                cost: 100,
              },
              {
                name: "Per Mission 10",
                amount: 10,
                type: "mission",
                cost: 200,
              },
              {
                name: "Per Mission 15",
                amount: 15,
                type: "mission",
                cost: 300,
              },
              {
                name: "Per Mission 20",
                amount: 20,
                type: "mission",
                cost: 400,
              },
            ],
          },
        },
      ],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/packages/all",
      alias: "/packages/list",
      payloads: [
        {
          summary: "Client requests available packages",
          data: {
            timestamp: 123456789,
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
