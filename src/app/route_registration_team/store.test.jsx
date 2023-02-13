const PLAYER_SCHEMA = {
  username: "",
  firstName: "",
  wristbandNumber: 0,
  wristbandColorCode: 0,
  wristbandStatus: "",
  wristbandPairing: false,
};
const PACKAGE_SCHEMA = {
  id: 0,
  name: "",
  discountCode: "",
  discountAmount: "",
  costPerPerson: [
    {
      username: "",
      discountCode: "",
      discountAmount: "",
      personCost: 0,
      netPersonCost: 0,
    },
  ],
  packageCost: 0,
  netCost: 0,
};
const TEAM_SCHEMA = {
  id: "",
  name: "",
  status: "",
  players: [],
};
const active_team = {
  id: "stehous23",
  name: "the_tigers",
  status: "cached",
  players: [
    {
      username: "test1",
      firstName: "yolo1",
      wristbandNumber: 1,
      wristbandColorCode: 1,
      wristbandStatus: "paired",
      wristbandPairing: false,
    },
    {
      username: "test2",
      firstName: "yolo2",
      wristbandNumber: 2,
      wristbandColorCode: 2,
      wristbandStatus: "paired",
      wristbandPairing: false,
    },
    {
      username: "test3",
      firstName: "yolo3",
      wristbandNumber: 3,
      wristbandColorCode: 3,
      wristbandStatus: "",
      wristbandPairing: true,
    },
  ],
};
const testData = {
  active: active_team,
  teams: [active_team],
};

const registrationTestState = [
  () => {
    return {
      active: null,
      teams: [],
    };
  },

  () => {
    return {
      active: active_team,
      teams: [active_team],
    };
  },
];

export { registrationTestState };
