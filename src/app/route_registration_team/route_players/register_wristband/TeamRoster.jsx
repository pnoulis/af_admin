import * as React from "react";
import styled from "styled-components";
import { PlayerWidget } from "./PlayerWidget";

const StyleLayoutTeamRoster = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 70px;
  gap: 50px;
  width: 100%;
`;

const StyleLayoutItemPlayerWidget = styled(PlayerWidget)``;

function TeamRoster({
  roster = [],
  onStartPairingPlayerWristband,
  onStopPairingPlayerWristband,
  onRemovePlayerRoster,
  className,
}) {
  return (
    <StyleLayoutTeamRoster className={className}>
      {roster.map((player, i) => (
        <StyleLayoutItemPlayerWidget
          key={i}
          index={i}
          player={player}
          onStartPairingPlayerWristband={onStartPairingPlayerWristband}
          onStopPairingPlayerWristband={onStopPairingPlayerWristband}
          onRemovePlayerRoster={onRemovePlayerRoster}
        />
      ))}
    </StyleLayoutTeamRoster>
  );
}

export { TeamRoster };
