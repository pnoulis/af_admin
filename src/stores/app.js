import React, { useReducer, useContext, useCallback } from 'react';

const actions = {
  login(login) {
    return { type: 'LOGIN', login }
  },
  logout() {
    return { type: 'LOGOUT' }
  },
  switchLanguage(lang) {
    return { type: 'SWITCH_LANG', lang }
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, login: action.login };
    case 'LOGOUT':
      return { ...state, login: null };
    case 'SWITCH_LANG':
      return { ...state, lang: action.lang };
    default:
      return state;
  }
}

const GLOBAL_SCHEMA = {
  lang: 'en-US',
  login: null,
};
const globalContext = React.createContext(GLOBAL_SCHEMA);
const useGlobalContext = () => useContext(globalContext);
function useStore(initialState = GLOBAL_SCHEMA) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const proxy = useCallback(
    (action, ...payload) => dispatch(actions[action](...payload))
    , [initialState]
  );

  return [state, proxy];
}
const GlobalStore = {
  Provide: globalContext.Provider,
  init: useStore,
  use: useGlobalContext,
};
export default GlobalStore;
