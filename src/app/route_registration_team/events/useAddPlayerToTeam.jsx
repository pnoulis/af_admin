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
          { timeout: 5000 }
        );
      } else {
        FlashMessage.info(
          `Successfully added ${newPlayer.username} to team`,
          { timeout: 5000 }
        );
        setState({ type: "add_player", player: newPlayer });
      }
    },
    []
  );

  return handleAddPlayerToTeam;
}

export { useAddPlayerToTeam };
