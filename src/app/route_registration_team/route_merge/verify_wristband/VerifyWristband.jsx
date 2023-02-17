import * as React from "react";
import styled from "styled-components";
import { TeamRoster } from "./TeamRoster";
import {
  useRegistrationContext,
  useStartPairingPlayerWristband,
  usePairPlayerWristband,
} from "/src/app/route_registration_team";
import { useMqtt } from "/src/mqtt";

const StyleLayoutVerifyWristband = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas: "header" "team_roster";
  gap: 100px;
  /* Dimensions */
  width: 100%;
  height: 100%;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;
const StyleLayoutItemHeader = styled.header`
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-family: NoirPro-Bold;
  font-size: 1.8rem;
  text-transform: uppercase;
  color: var(--primary-strong);
  letter-spacing: 2px;
  text-shadow: var(--card-basic-shadow);
`;
const StyleLayoutItemTeamRoster = styled(TeamRoster)`
  grid-area: team_roster;
`;

function VerifyWristband({ className }) {
  const { state, dispatchRegistration } = useRegistrationContext();
  const { client } = useMqtt();
  const [err, setErr] = React.useState("");

  const handleValidatePlayerWristband = (player) => {
    const registeredPlayer = state.active?.roster.find(
      (p) => p.username === player.username
    );

    if (!registeredPlayer) {
      return alert("wristband does not belong to any player in the roster");
    }

    dispatchRegistration({ type: "verify_wristband", player });
  };

  const handleStartPairingPlayerWristband = useStartPairingPlayerWristband(
    state,
    dispatchRegistration
  );

  React.useEffect(() => {
    state.active?.roster.forEach((player) => {
      handleStartPairingPlayerWristband(player, "overwrite");
    });

    const unsubscribe = client.subscribe("wristband/scan", (err, res) => {
      if (err) {
        throw new Error("500 - Server internal error");
      }

      client.publish(
        "wristband/isValid",
        { wristbandNumber: res.wristbandNumber },
        (err, res) => {
          if (err) {
            throw new Error("500 - Server internal error");
          }

          if (res.result === "OK") {
            handleValidatePlayerWristband(res.player);
          } else {
            setErr(res.message);
          }
        }
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <StyleLayoutVerifyWristband className={className}>
      <StyleLayoutItemHeader>scan player's wristbands</StyleLayoutItemHeader>
      <StyleLayoutItemTeamRoster roster={state.active?.roster} />
      <p>{err}</p>
    </StyleLayoutVerifyWristband>
  );
}

export { VerifyWristband };
