import * as React from "react";
import { FlashMessage } from "/src/flash_messages";

function useAddPlayerToTeam() {
  const handleAddPlayerToTeam = React.useCallback(
    (state, setState, newPlayer) => {
      if (
        state.active?.roster.find(
          (player) => player.username === newPlayer.username
        )
      ) {
        FlashMessage.warn(
          `Player ${newPlayer.username} is already part of the team`,
          { timeout: 10000 }
        );
      } else {
        setState({ type: "add_player", player: newPlayer });
      }
    },
    []
  );

  return handleAddPlayerToTeam;
}

export { useAddPlayerToTeam };
