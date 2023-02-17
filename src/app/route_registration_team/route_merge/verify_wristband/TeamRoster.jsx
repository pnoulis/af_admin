import * as React from "react";
import styled from "styled-components";
import { PlayerWidget } from "./PlayerWidget";

const StyleLayoutTeamRoster = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  justify-content: space-around;
`;

const StyleLayoutItemPlayerWidget = styled(PlayerWidget)``;

function TeamRoster({ roster = [], className }) {
  return (
    <StyleLayoutTeamRoster className={className}>
      {roster.map((player, i) => (
        <StyleLayoutItemPlayerWidget key={i} index={i} player={player} />
      ))}
    </StyleLayoutTeamRoster>
  );
}

export { TeamRoster };
