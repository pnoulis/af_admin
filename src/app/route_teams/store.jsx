import * as React from 'react';
import { generateRandomName } from '/src/lib';

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
  registered: 1,
  paid: 2,
  active: 3,
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
  status: WRISTBAND_STATUS['new'],
  pairing: false,
};

const PLAYER_SCHEMA = {
  assigned: false,
  username: "",
  firstName: "",
  wristband: WRISTBAND_SCHEMA,
};

const PACKAGE_SCHEMA = {
  id: 0,
  name: '',
  status: PACKAGE_STATUS['new'],
  costPerPerson: [
    {
      username: '',
      cost: 0,
    }
  ],
  packageCost: 0,
  netCost: 0,
}

function playerSchema(group, username) {
  return {
    assigned: group ?? false,
    username,
    firstName: '',
    wristband: WRISTBAND_SCHEMA,
  }
}

function teamSchema(group) {
  return {
    id: Math.random().toString(16).slice(2,8),
    name: generateRandomName(),
    status: TEAM_STATUS["new"],
    isGroup: group,
    roster: [
      playerSchema(group, 'player#1'),
      playerSchema(group, 'player#2'),
      playerSchema(group, 'player#3'),
      playerSchema(group, 'player#4'),
      playerSchema(group, 'player#5'),
      playerSchema(group, 'player#6'),
    ],
    packages: [],
  };
}
const TEAM_SCHEMA = {
  id: Math.random().toString(16).slice(2,8),
  name: generateRandomName(),
  status: TEAM_STATUS["new"],
  isGroup: true,
  roster: [
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
    PLAYER_SCHEMA,
  ],
  packages: [],
}

const TEAMS_SCHEMA = { active: TEAM_SCHEMA };
TEAMS_SCHEMA.teams = [TEAMS_SCHEMA.active];

const TeamsContext = React.createContext({});
const teamsReducer = (state, action) => {
  switch (action.type) {
  case 'set_active':
    console.log(state);
    // state.active = action.active;
    return {
      ...state
    };
  case "start_pairing_wristband":
    state.active.roster = state.active.roster.map((player) => {
      player.wristband.pairing = false;
      return player;
    })
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
  case 'new_state':
    return {
      ...action.new,
    };
  default:
    return {
      ...state
    };
    // throw new Error(`Unrecognized teams context action type:${action.type}`);
  }
}

const useTeamsContext = () => {
  const context = React.useContext(TeamsContext);
  if (context == null) {
    throw new Error('A component is not being provided the Teams Context');
  }
  return context;
}

const TeamsProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(teamsReducer, TEAMS_SCHEMA);
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <TeamsContext.Provider value={{state, dispatch}}>
      {children}
    </TeamsContext.Provider>
  );
}

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
}
