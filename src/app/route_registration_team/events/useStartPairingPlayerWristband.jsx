import * as React from "react";
import { WRISTBAND_STATUS } from "/src/app/route_registration_team";
import { Modal } from "/src/modals";
import { ConfirmUnpairDialog } from "./ConfirmUnpairDialog";

function useStartPairingPlayerWristband(state, setState) {
  if (state == null || setState == null) {
    throw new Error("Null state to useStartPairingPlayerWristband");
  }

  const handleStartPairingPlayerWristband = React.useCallback(
    (player, overwrite) => {
      console.log(player);
      if (!overwrite && player.wristband.status >= WRISTBAND_STATUS["paired"]) {
        Modal.render(
          <ConfirmUnpairDialog
            initialOpen
            onUnpair={() =>
              setState({
                type: "stop_pairing_wristband",
                player,
              })
            }
          />
        );
      } else {
        setState({ type: "start_pairing_wristband", player });
      }
    },
    [state, setState]
  );

  return handleStartPairingPlayerWristband;
}

export { useStartPairingPlayerWristband };
