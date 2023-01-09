import { Place } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { ReactComponent as WristbandIcon } from "/assets/icons/wristband_image.svg";
import { PlayerList } from "/src/components/team";

const WristbandPanelStyle = styled.section`
  grid-area: Wristband;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  gap: 20px;

  .player-status-list {
    min-height: 200px;
  }

  .wristband-widget {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
    border: 5px solid transparent;

    border-radius: var(--border-radius-2);
  }
`;

export default function WristbandPanel() {
  return (
    <WristbandPanelStyle className="player-wristband-panel">
      <section className="player-status-list">
        <PlayerList />
      </section>
      <section className="wristband-widget handContainer Light-Mode">
        <WristbandIcon />
      </section>
    </WristbandPanelStyle>
  );
}
