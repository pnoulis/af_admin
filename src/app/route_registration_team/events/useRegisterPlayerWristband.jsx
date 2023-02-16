import * as React from "react";
import { useMqtt } from "/src/mqtt";
import { FlashMessage } from "/src/flash_messages";
import { WRISTBAND_STATUS } from "/src/app/route_registration_team";

function useRegisterPlayerWristband(state, setState) {
  if (state == null || setState == null) {
    throw new Error("Null state to useRegisterPlayerWristband middleware");
  }
  const { client } = useMqtt();

  const handleRegisterPlayerWristband = React.useCallback(
    (player) => {
      if (player.wristband.status < WRISTBAND_STATUS["paired"]) {
        throw new Error(
          `Trying to register an unpaired wristband to player:${player.username}`
        );
      }

      client.publish(
        "/wristband/register",
        {
          username: player.username,
          wristbandNumber: player.wristband.number,
        },
        (err, res) => {
          if (err) {
            throw new Error(err);
          }

          if (res.result === "OK") {
            setState({ type: "register_wristband", player });
            FlashMessage.info(
              `Successfully registered wristband to player:${player.username}`
            );
          } else {
            FlashMessage.error(
              `Failed to register wristband to player:${player.username}`
            );
          }
        }
      );
    },
    [state, setState]
  );

  return handleRegisterPlayerWristband;
}

export { useRegisterPlayerWristband };
