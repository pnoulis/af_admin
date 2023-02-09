import * as React from "react";

const TeamRegistrationContext = React.createContext({});
const teamRegistrationReducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error(
        `Unrecognized team registration context action type:${action.type}`
      );
  }
};

const useTeamRegistrationContext = () => {
  const { state, dispatch } = React.useContext(TeamRegistrationContext);

  return [state, dispatch];
};

const TeamRegistrationContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer;
};
