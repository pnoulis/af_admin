import * as React from "react";
import { useMqtt } from "/src/mqtt";
// import { useFlashMessage } from "/src/flash_messages";
import { useRegistrationContext, WRISTBAND_STATUS } from "./store";

function useAddPlayerToTeam() {
  const { state, dispatchRegistration } = useRegistrationContext();
  // const [getFm, createFm] = useFlashMessage();
  const { client } = useMqtt();

  const addPlayerToTeam = React.useCallback(
    (form, setForm) => {
      if (
        state.active?.roster.find(
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
          // createFm({
          //   type: "info",
          //   message: `Successfully added ${res.player.username}`,
          // });
        }
      });
    },
    [state, dispatchRegistration]
  );

  return {
    addPlayerToTeam,
    // getFm,
    state,
    dispatchRegistration,
  };
}

function usePairPlayerWristband() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const { client } = useMqtt();

  React.useEffect(() => {
    const unsubscribe = client.subscribe("wristband/scan", (err, res) => {
      if (err) {
        throw new Error("500 - Server internal error");
      }

      const player = state.active?.roster.find(
        (player) => player.wristband.pairng
      );

      if (!player) {
        // throw flash message here
        throw new Error(
          "Received scan for wristband but no user is being paired"
        );
      }

      dispatchRegistration({
        type: "pair_wristband",
        player,
        pairing: false,
        wristband: {
          ...res,
        },
      });
    });

    return () => unsubscribe();
  }, []);

  const handleOnPairWristband = React.useCallback((player) => {
    if (player.wristband.status >= WRISTBAND_STATUS["paired"]) {
      // show dialog
    } else {
      dispatchRegistration({
        type: "pair_wristband",
        player,
        pairing: !player.wristband.pairing,
        wristband: null,
      });
    }
  }, []);

  return {
    handleOnPairWristband,
  };
}

export { useAddPlayerToTeam };
