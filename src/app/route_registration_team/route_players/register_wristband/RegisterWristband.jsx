import * as React from "react";
import styled from "styled-components";
import { TeamRoster } from "./TeamRoster";
import { WristbandStatus } from "./WristbandStatus";
import {
  useRegistrationContext,
  usePairPlayerWristband,
  useRemovePlayerRoster,
} from "/src/app/route_registration_team";

const StyleLayoutRegisterWristband = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(15%, max-content) 1fr;
  grid-template-areas: "team_roster" "wristband_status";
  gap: 30px;
  /* Dimensions */
  padding-bottom: 50px;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutItemTeamRoster = styled(TeamRoster)`
  grid-area: team_roster;
`;
const StyleLayoutItemWristbandStatus = styled(WristbandStatus)`
  grid-area: wristband_status;
height: 300px;
align-self: center;
`;

function RegisterWristband({className}) {
  const { state, dispatchRegistration } = useRegistrationContext();
  const handlePairPlayerWristband = usePairPlayerWristband(
    state,
    dispatchRegistration
  );
  const handleRemovePlayerRoster = useRemovePlayerRoster(
    state,
    dispatchRegistration,
  );

  return (
    <StyleLayoutRegisterWristband className={className}>
      <StyleLayoutItemTeamRoster
        roster={state.active?.roster}
        onPlayerRemove={handleRemovePlayerRoster}
        onWristbandPair={handlePairPlayerWristband}
      />
      <StyleLayoutItemWristbandStatus
        pairing={state.active?.roster.some((player) => player.wristband?.pairing)}
      />
    </StyleLayoutRegisterWristband>
  );
}

export { RegisterWristband };
