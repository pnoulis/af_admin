import * as React from "react";
import { FlashMessage } from "/src/flash_messages";

function useRemovePlayerRoster(state, setState) {
  if (state == null || setState == null) {
    throw new Error("Null state to useRemovePlayerRoster middleware");
  }
  const handleRemovePlayerRoster = React.useCallback((player) => {
    setState({ type: "remove_player", player });
    FlashMessage.info(`Successfully removed ${player.username} from team`, {
      timeout: 5000,
    });
  }, []);

  return handleRemovePlayerRoster;
}

export { useRemovePlayerRoster };
