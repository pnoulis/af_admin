import * as React from "react";
import styled from "styled-components";
import {
  PlayerActionbarItemWristbandPair,
  PlayerActionbar,
} from "/src/app/route_registration_team/roster";

const StyleLayoutPlayerWidget = styled.article`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 30px;
  /* Dimensions */
  padding: 10px;
  /* Position */
  /* Fonts */
  font-family: NoirPro-Medium;
  /* Effects */
  /* Children */
`;

const StyleLayoutItemUsername = styled.p`
  font-size: 1.3rem;
`;

function PlayerWidget({ index, player }) {
  return (
    <StyleLayoutPlayerWidget>
      <PlayerActionbar>
        <PlayerActionbarItemWristbandPair disable player={player} size="60px" />
      </PlayerActionbar>
      <StyleLayoutItemUsername>
        {player.assigned ? player.username : `player #${index + 1}`}
      </StyleLayoutItemUsername>
    </StyleLayoutPlayerWidget>
  );
}

export { PlayerWidget };
