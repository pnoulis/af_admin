import * as React from "react";
import { useMqtt } from "/src/mqtt";
import { useFlashMessage } from "/src/flash_messages";
import { useRegistrationContext } from "./store";

function useAddPlayerToTeam() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const [getFm, createFm] = useFlashMessage();
  const { client } = useMqtt();

  const addPlayerToTeam = React.useCallback(
    (form, setForm) => {
      if (
        state.active?.players.find(
          (player) => player.username == form.fields.username
        )
      ) {
        return setForm(
          "setError",
          `Player ${form.fields.username} is already part of the team`
        );
      }

      client.publish("/player/login", form.fields, (err, res) => {
        if (err) {
          throw new Error("500 - Internal server error page");
        } else if (res.result === "NOK") {
          setForm("setError", res.message);
        } else {
          dispatchRegistration({ type: "add_player", player: res.player });
          createFm({
            type: "info",
            message: `Successfully added ${res.player.username}`,
          });
        }
      });
    },
    [state, dispatchRegistration]
  );

  return {
    addPlayerToTeam,
    getFm,
    state,
    dispatchRegistration,
  };
}

function usePairPlayerWristband() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const { client } = useMqtt();
  const subscriptionRef = React.useRef(null);

  const handleOnPairWristband = React.useCallback(
    (player) => {
      // unsubscribe
      subscriptionRef.current && subscriptionRef.current();
      // simple toggle action
      if (player.wristbandPairing) {
        return dispatchRegistration({
          type: "pair_wristband",
          username: player.username,
        });
      }
    },
    [state, dispatchRegistration]
  );

  return {
    handleOnPairWristband,
  };
}

export { useAddPlayerToTeam };
