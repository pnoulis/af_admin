import * as React from "react";
import styled from "styled-components";
import { PlayerWidget } from "./PlayerWidget";

const StyleTeamRoster = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 70px;
  width: 100%;
  align-content: center;
  padding-right: 20px;
`;

function TeamRoster({ roster, afpackage, className }) {
  return (
    <StyleTeamRoster className={className}>
      {roster.map((player, i) => (
        <PlayerWidget
          key={i}
          index={i}
          player={player}
          cost={
            afpackage?.costPerPerson.find(
              (costPerPlayer) => costPerPlayer.username === player.username
            ) || {}
          }
        />
      ))}
    </StyleTeamRoster>
  );
}

export { TeamRoster };
