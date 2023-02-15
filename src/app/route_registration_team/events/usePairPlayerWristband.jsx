import * as React from "react";
import { useMqtt } from "/src/mqtt";
import { FlashMessage } from "/src/flash_messages";
import { Modal } from "/src/modals";
import { ConfirmUnpairDialog } from "./ConfirmUnpairDialog";
import { WRISTBAND_STATUS } from "/src/app/route_registration_team";

function usePairPlayerWristband(state, setState) {
  if (state == null || setState == null) {
    throw new Error("Null state to usePairPlayerWristband middleware");
  }
  const { client } = useMqtt();

  React.useEffect(() => {
    const unsubscribe = client.subscribe("wristband/scan", (err, res) => {
      if (err) {
        throw new Error("500 - Server internal error");
      }

      const player = state.active?.roster.find(
        (player) => player.wristband.pairing
      );

      if (!player) {
        FlashMessage.warn("Missed wristband scan");
      } else {
        setState({
          type: "pair_wristband",
          player,
          pairing: false,
          wristband: {
            number: res.wristbandNumber,
            colorCode: res.wristbandColor,
          },
        });
      }
    });

    return () => unsubscribe();
  }, [state, setState]);

  const handlePairPlayerWristband = React.useCallback((player) => {
    if (player.wristband.status >= WRISTBAND_STATUS["paired"]) {
      Modal.render(
        <ConfirmUnpairDialog
          initialOpen
          onUnpair={() =>
            setState({
              type: "pair_wristband",
              player,
              pairing: false,
            })
          }
        />
      );
    } else {
      setState({
        type: "pair_wristband",
        player,
        pairing: !player.wristband.pairing,
      });
    }
  }, []);

  return handlePairPlayerWristband;
}

export { usePairPlayerWristband };
