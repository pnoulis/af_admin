import React from "react";
import styled from "styled-components";
import PlayerSelectionSection from "./PlayerSelectionSection";
import WristbandSection from "./WristbandSection";

const Container = styled.div`
  all: unset;
  box-sizing: border-box;
  display: grid;

  // Dimensions
  min-width: 100%;
  min-height: 100%;

  // Contents
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "PlayerSelection Wristband";

  .player-wristband {
    width: 100%;
    height: 100%;

    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
    background-color: white;
    border-radius: var(--border-radius-2);
    // background-color: var(--background);
    grid-area: Wristband;
    display: flex;
    padding: 20px;
    flex-flow: column nowrap;
    padding-bottom: 50px;
    gap: 20px;

    h1 {
      font-size: var(--text-xxxl);
      color: var(--primary-strong);
      text-transform: capitalize;
      letter-spacing: 2px;
      align-self: flex-start;
    }

    .player-status-list {
      display: flex;
      justify-content: flex-start;
    }

    .handContainer {
      backgcround-color: white;
      margin-top: auto;
      width: 80%;
      align-self: center;
    }
  }
`;
export default function AddPlayer() {
  return (
    <Container>
      {/* <PlayerSelectionSection /> */}
      {/* <WristbandSection /> */}
    </Container>
  );
}
