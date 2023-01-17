import { createContext, useReducer, useContext, useCallback } from "react";

const actions = {
  addPlayer(player) {
    return { type: "ADD_PLAYER", player };
  },
  nameTeam(name) {
    return { type: "NAME_TEAM", name };
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PLAYER":
      return { ...state, players: action.player };
    case "NAME_TEAM":
      return { ...state, team: action.name };
    default:
      return state;
  }
}

const REGISTRATION_SCHEMA = {
  team: {
    name: "",
    state: "new", // new -> merged -> packaged -> playing
  },
  package: {},
  players: [],
};

const registrationContext = createContext(REGISTRATION_SCHEMA);

const useRegistrationContext = () => useContext(registrationContext);

function useRegistration(initialState = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...REGISTRATION_SCHEMA,
    ...initialState,
  });

  const proxy = useCallback(
    (action, ...payload) => dispatch(actions[action](...payload)),
    [initialState]
  );

  return [state, proxy];
}

const registrationStore = {
  Provide: registrationContext.Provider,
  init: useRegistration,
  use: useRegistrationContext,
};

export default registrationStore;
