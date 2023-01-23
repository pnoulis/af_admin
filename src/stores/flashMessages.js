import * as React from "react";

const FlashMessagesContext = React.createContext([]);
const useFlashMessagesContext = () => React.useContext(FlashMessagesContext);

function useFlashMessagesStore(initialState = []) {
  const [state, dispatch] = React.useState([...initialState]);

  return [state, dispatch];
}

const FlashMessagesStore = {
  Provide: FlashMessagesContext.Provider,
  init: useFlashMessagesStore,
  use: useFlashMessagesContext,
};

export { FlashMessagesStore };
export default FlashMessagesStore;
