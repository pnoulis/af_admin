import * as React from "react";
import styled, { keyframes } from "styled-components";
import { TeamRoster } from "./TeamRoster";
import {
  useRegistrationContext,
  useStartPairingPlayerWristband,
  WRISTBAND_STATUS,
} from "/src/app/route_registration_team";
import { useMqtt } from "/src/mqtt";
import { FlashMessage } from '/src/flash_messages';

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



function VerifyWristband({ onVerifiedWristbands, className }) {
  const { state, dispatchRegistration } = useRegistrationContext();
  const { client } = useMqtt();
  const [err, setErr] = React.useState("");

  const handleValidatePlayerWristband = (player) => {
    const registeredPlayer = state.active?.roster.find(
      (p) => p.username === player.username
    );

    if (!registeredPlayer) {
      FlashMessage.warn(`Player ${player.username} is not part of the roster`);
      return;
    }

    dispatchRegistration({ type: "verify_wristband", player });
  };

  const handleStartPairingPlayerWristband = useStartPairingPlayerWristband(
    state,
    dispatchRegistration
  );

  React.useEffect(() => {
    state.active?.roster.forEach((player) => {
      if (player.wristband.status < WRISTBAND_STATUS['verified']) {
        handleStartPairingPlayerWristband(player, "overwrite");
      }
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
            // modal, remove player from team
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
    </StyleLayoutVerifyWristband>
  );
}

export { VerifyWristband };
