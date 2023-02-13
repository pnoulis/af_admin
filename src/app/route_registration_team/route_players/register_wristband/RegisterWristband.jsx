import * as React from "react";
import styled from "styled-components";
import { TeamRoster } from "./TeamRoster";
import { WristbandStatus } from "./WristbandStatus";
import { useRegistrationContext } from "/src/app/route_registration_team";

const StyleLayoutRegisterWristband = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 300px;
  grid-template-areas: "team_roster" "wristband_status";
  justify-items: center;
  align-items: center;
  gap: 30px;
  /* Dimensions */
  width: 80%;
  height: 100%;
  padding-bottom: 50px;
  /* Position */
  margin: auto;
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutItemTeamRoster = styled(TeamRoster)`
  grid-area: team_roster;
  align-self: flex-start;
`;
const StyleLayoutItemWristbandStatus = styled(WristbandStatus)`
  grid-area: wristband_status;
`;

function RegisterWristband() {
  const { state, dispatchRegistration } = useRegistrationContext();

  const handleOnWristbandPair = React.useCallback((player) => {
    dispatchRegistration({ type: "pair_wristband", username: player.username });
  }, []);

  const handleOnPlayerRemove = React.useCallback(() => {}, []);

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <StyleLayoutRegisterWristband>
      <StyleLayoutItemTeamRoster
        roster={state.active?.players}
        onPlayerRemove={handleOnPlayerRemove}
        onWristbandPair={handleOnWristbandPair}
      />
      <StyleLayoutItemWristbandStatus />
    </StyleLayoutRegisterWristband>
  );
}

export { RegisterWristband };
