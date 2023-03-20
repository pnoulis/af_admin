import * as React from "react";
import { generateRandomName } from "/src/lib";

const TEAM_STATUS = {
  new: 0,
  cached: 1,
  registered: 2,
  packaged: 3,
  playing: 4,
  paused: 5,
};

const PACKAGE_STATUS = {
  new: 0,
  configured: 1,
  saved: 2,
  registered: 3,
  paid: 4,
  active: 5,
};

const WRISTBAND_STATUS = {
  new: 0,
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
  number: null,
  colorCode: null,
  status: WRISTBAND_STATUS["new"],
  pairing: false,
};

const PLAYER_SCHEMA = {
  assigned: false,
  group: false,
  username: "",
  firstName: "",
  wristband: WRISTBAND_SCHEMA,
};

const PACKAGE_SCHEMA = {
  id: 0,
  name: "",
  status: PACKAGE_STATUS["new"],
  costPerPerson: [
    {
      username: "",
      cost: 0,
    },
  ],
  cost: 0,
  netCost: 0,
};

function playerSchema(group, username) {
  return {
    assigned: false,
    group,
    username,
    firstName: "",
    wristband: WRISTBAND_SCHEMA,
  };
}

function teamSchema(group) {
  return {
    id: Math.random().toString(16).slice(2, 8),
    name: generateRandomName(),
    status: TEAM_STATUS["new"],
    isGroup: group,
    roster: [
      playerSchema(group, "player#1"),
      playerSchema(group, "player#2"),
      playerSchema(group, "player#3"),
      playerSchema(group, "player#4"),
      playerSchema(group, "player#5"),
      playerSchema(group, "player#6"),
    ],
    packages: [],
  };
}
const TEAM_SCHEMA = {
  id: Math.random().toString(16).slice(2, 8),
  name: generateRandomName(),
  status: TEAM_STATUS["new"],
  isGroup: false,
  roster: [
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
  ],
  packages: [],
};

const TEAMS_SCHEMA = { active: TEAM_SCHEMA };
TEAMS_SCHEMA.teams = [TEAMS_SCHEMA.active];

const TeamsContext = React.createContext({});
const teamsReducer = (state, action) => {
  switch (action.type) {
    case "remove_player":
      state.active.roster = state.active.roster.map((player) => {
        if (player.username === action.player.username) {
          return playerSchema(state.active.isGroup);
        }
        return player;
      });
      return {
        ...state,
      };
    case "set_packages":
      return {
        ...state,
        active: {
          ...state.active,
          packages: action.packages,
        },
      };
    case "conf_package":
      console.log("--------------------------------------------------");
      console.log(action);
      let pkg = state.active.packages.find((pkg) => pkg.id === action.package);
      const players = state.active.roster.filter(
        (player) => player.assigned
      ).length;
      const costPerPerson = Number.parseFloat(
        action.catalogue.cost / players
      ).toFixed(2);
      pkg.costPerPerson = state.active.roster.map((player) => {
        return {
          username: player.username,
          cost: player.assigned ? costPerPerson : 0,
        };
      });
      pkg.catalogue = action.catalogue;
      pkg.cost = action.catalogue.cost;
      pkg.netCost = pkg.cost;
      pkg.status = PACKAGE_STATUS.configured;
      state.active.packages = [...state.active.packages];
      return {
        ...state,
      };
    case "pair_wristband":
      state.active.roster = state.active.roster.map((player) => {
        if (player.username === action.player.username) {
          player.assigned = true;
          player.wristband = {
            ...player.wristband,
            ...action.wristband,
            pairing: false,
            status: WRISTBAND_STATUS["paired"],
          };
        }
        return player;
      });

      return {
        ...state,
      };
    case "add_player":
      const team = state.active;
      let assigned = false;
      console.log(action);
      team.roster = team.roster.map((player) => {
        if (!player.assigned && !assigned) {
          assigned = true;
          return {
            ...playerSchema(state.active.isGroup),
            username: action.player.username,
            firstName: action.player.firstName,
            assigned: true,
          };
        }
        return player;
      });
      return {
        ...state,
        active: team,
      };
    case "set_active":
      console.log(state);
      // state.active = action.active;
      return {
        ...state,
      };
    case "start_pairing_wristband":
      state.active.roster = state.active.roster.map((player) => {
        player.wristband.pairing = false;
        return player;
      });
      state.active.roster = state.active.roster.map((player) => {
        if (player.username === action.player.username) {
          player.wristband = {
            ...WRISTBAND_SCHEMA,
            ...player.wristband,
            pairing: true,
          };
        }
        return player;
      });
      return {
        ...state,
      };
    case "stop_pairing_wristband":
      state.active.roster = state.active.roster.map((player) => {
        if (player.username === action.player.username) {
          player.wristband = {
            ...WRISTBAND_SCHEMA,
            pairing: false,
          };
        }
        return player;
      });
      return {
        ...state,
      };
    case "new_state":
      return {
        ...action.new,
      };
    default:
      return {
        ...state,
      };
    // throw new Error(`Unrecognized teams context action type:${action.type}`);
  }
};

const useTeamsContext = () => {
  const context = React.useContext(TeamsContext);
  if (context == null) {
    throw new Error("A component is not being provided the Teams Context");
  }
  return context;
};

const TeamsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(teamsReducer, TEAMS_SCHEMA);
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <TeamsContext.Provider value={{ state, dispatch }}>
      {children}
    </TeamsContext.Provider>
  );
};

export {
  useTeamsContext,
  TeamsProvider,
  WRISTBAND_STATUS,
  TEAM_STATUS,
  PACKAGE_STATUS,
  WRISTBAND_COLOR_CODES,
  WRISTBAND_SCHEMA,
  PLAYER_SCHEMA,
  TEAM_SCHEMA,
  PACKAGE_SCHEMA,
  teamSchema,
};
