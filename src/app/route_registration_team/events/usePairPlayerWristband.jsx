import * as React from "react";
import { useMqtt } from "/src/mqtt";
import { FlashMessage } from "/src/flash_messages";

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
          wristband: {
            number: res.wristbandNumber,
            colorCode: res.wristbandColor,
          },
        });
      }
    });

    return () => unsubscribe();
  }, [state, setState]);
}

export { usePairPlayerWristband };
