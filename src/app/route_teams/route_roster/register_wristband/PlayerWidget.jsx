import * as React from "react";
import styled from "styled-components";
import {
  PlayerActionbarItemWristbandPair,
  PlayerActionbarItemRosterRemove,
  PlayerActionbar,
} from "/src/app/route_registration_team/roster";
import {
  useRegistrationContext,
  useStartPairingPlayerWristband,
  useStopPairingPlayerWristband,
  useRemovePlayerRoster,
  WRISTBAND_STATUS,
} from "/src/app/route_registration_team";

const StyleLayoutPlayerWidget = styled.article`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 30px;
  justify-content: space-between;
  /* Dimensions */
  padding: 8px 5px 8px 12px;
  min-width: 250px;
  /* Position */
  /* Fonts */
  font-family: NoirPro-Medium;
  /* Effects */
  border: 4px solid transparent;
  border-radius: var(--border-radius-1);
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5); //black with 30% opacity
  // box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1), -2px -2px 15px rgba(0, 0, 0, 0.1);
  /* Children */
`;

const StyleLayoutItemUsername = styled.p``;

function PlayerWidget({
  index,
  player,
  onStartPairingPlayerWristband,
  onStopPairingPlayerWristband,
  onRemovePlayerRoster,
}) {
  return (
    <StyleLayoutPlayerWidget>
      <StyleLayoutItemUsername>
        {player.username || `player #${index + 1}`}
      </StyleLayoutItemUsername>
      <PlayerActionbar>
        <PlayerActionbarItemWristbandPair
          player={player}
          onWristbandPair={(player) => {
            if (player.wristband.pairing) {
              onStopPairingPlayerWristband(player);
            } else {
              onStartPairingPlayerWristband(player);
            }
          }}
        />
        <PlayerActionbarItemRosterRemove
          player={player}
          onRemovePlayerRoster={onRemovePlayerRoster}
        />
      </PlayerActionbar>
    </StyleLayoutPlayerWidget>
  );
}

export { PlayerWidget };
