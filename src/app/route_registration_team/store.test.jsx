const WRISTBAND_STATUS = {
  paired: 1,
  registered: 2,
  verified: 3,
};

const WRISTBAND_COLOR_CODES = [
  "black",
  "red",
  "purple",
  "green",
  "yellow",
  "blue",
  "orange",
];

const WRISTBAND_SCHEMA = {
  number: 0,
  colorCode: null,
  status: null,
  pairing: false,
};

const PLAYER_SCHEMA = {
  username: "",
  firstName: "",
  wristband: WRISTBAND_SCHEMA,
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
  roster: [],
};
const active_team = {
  id: "stehous23",
  name: "the_tigers",
  status: "cached",
  roster: [
    {
      username: "test1",
      firstName: "yolo1",
      wristband: {
        number: 1,
        colorCode: 1,
        status: WRISTBAND_STATUS["paired"],
        pairing: false,
      },
    },
    {
      username: "test2",
      firstName: "yolo2",
      wristband: {
        number: 2,
        colorCode: 2,
        status: WRISTBAND_STATUS["paired"],
        pairing: false,
      },
    },
    {
      username: "test3",
      firstName: "yolo3",
      wristband: {
        number: 3,
        colorCode: 3,
        status: null,
        pairing: true,
      },
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
