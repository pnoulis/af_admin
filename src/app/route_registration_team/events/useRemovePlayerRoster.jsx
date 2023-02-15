import * as React from 'react';

function useRemovePlayerRoster(state, setState) {
  if (state == null || setState == null) {
    throw new Error("Null state to useRemovePlayerRoster middleware");
  }
  const handleRemovePlayerRoster = React.useCallback((player) => {
    setState({type: 'remove_player', player});
  }, []);

  return handleRemovePlayerRoster;
}

export { useRemovePlayerRoster };
