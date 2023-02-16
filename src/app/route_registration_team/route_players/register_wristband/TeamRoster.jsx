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

const StyleLayoutItem = styled.div``;

function TeamRoster({
  onPlayerRemove,
  onWristbandPair,
  roster = [],
  className,
}) {
  return (
    <StyleLayoutTeamRoster className={className}>
      {roster.map((player, i) => (
        <StyleLayoutItem key={i}>
          <PlayerWidget
            index={i}
            player={player}
            onPlayerRemove={onPlayerRemove}
            onWristbandPair={onWristbandPair}
          />
        </StyleLayoutItem>
      ))}
    </StyleLayoutTeamRoster>
  );
}

export { TeamRoster };
