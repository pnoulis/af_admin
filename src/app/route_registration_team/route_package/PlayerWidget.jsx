import * as React from "react";
import styled from "styled-components";
import {
  PlayerActionbarItemPrice,
  PlayerActionbar,
} from "/src/app/route_registration_team/roster";

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
  padding: 5px;
  max-width: 300px;
  width: 100%;
  /* Position */
  margin: auto;
  /* Fonts */
  font-family: NoirPro-Medium;
  /* Effects */
  // border: 4px solid transparent;
  border-radius: var(--border-radius-1);
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5); //black with 30% opacity
  /* Children */
`;

const StyleLayoutItemUsername = styled.p``;

function PlayerWidget({ index, player, cost }) {
  return (
    <StyleLayoutPlayerWidget>
      <StyleLayoutItemUsername>
        {player.assigned ? player.username : `player #${index + 1}`}
      </StyleLayoutItemUsername>
      <PlayerActionbar>
        <PlayerActionbarItemPrice size="20px" cost={cost} />
      </PlayerActionbar>
    </StyleLayoutPlayerWidget>
  );
}

export { PlayerWidget };
