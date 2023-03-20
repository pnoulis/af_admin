import * as React from "react";
import styled from "styled-components";
import { TeamRoster } from "./TeamRoster";
import { WristbandStatus } from "./WristbandStatus";
import { useTeamsContext, WRISTBAND_STATUS } from '/src/app/route_teams/store.jsx';
import {
  useRegisterPlayerWristband,
  usePairPlayerWristband,
  useRemovePlayerRoster,
  useStopPairingPlayerWristband,
  useStartPairingPlayerWristband,
} from "/src/app/route_teams/events/index.js";

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

function RegisterWristband({ className }) {
  const { state, dispatch } = useTeamsContext();
  const handleStartPairingPlayerWristband = useStartPairingPlayerWristband(
    state,
    dispatch
  );
  const handleStopPairingPlayerWristband = useStopPairingPlayerWristband(
    state,
    dispatch
  );
  usePairPlayerWristband(state, dispatch);

  const handleRemovePlayerRoster = useRemovePlayerRoster(
    state,
    dispatch
  );
  const handleRegisterPlayerWristband = useRegisterPlayerWristband(
    state,
    dispatch
  );

  React.useEffect(() => {
    const registerPlayer = state.active?.roster.find(
      (player) => player.wristband.status === WRISTBAND_STATUS["paired"]
    );

    if (registerPlayer) {
      handleRegisterPlayerWristband(registerPlayer);
    }
  }, [state]);

  return (
    <StyleLayoutRegisterWristband className={className}>
      <StyleLayoutItemTeamRoster
        roster={state.active?.roster}
        onStopPairingPlayerWristband={handleStopPairingPlayerWristband}
        onStartPairingPlayerWristband={handleStartPairingPlayerWristband}
        onRemovePlayerRoster={handleRemovePlayerRoster}
      />
      <StyleLayoutItemWristbandStatus
        pairing={state.active?.roster.some(
          (player) => player.wristband?.pairing
        )}
      />
    </StyleLayoutRegisterWristband>
  );
}

export { RegisterWristband };
