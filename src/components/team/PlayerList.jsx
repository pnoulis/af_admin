import React from "react";
import styled from "styled-components";
import { ReactComponent as WristbandIcon } from "/assets/icons/wristband_image-cropped.svg";

const players = [
  {
    name: "pavlos",
  },
  {
    name: "grigoris",
  },
];

const Container = styled.ul`
  display: grid;

  // Dimensions
  min-width: 100%;
  min-height: 100%;

  // Contents
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 70px;
  gap: 15px;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--border-radius-0);
  padding: 5px 10px;
  gap: 20px;
  position: relative;
  box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
  cursor: pointer;

  .text {
    font-size: var(--text-md);
    letter-spacing: 0.2px;
    word-spacing: 1px;
    white-space: nowrap;
    font-weight: bold;
  }

  .icon {
    width: 35%;
    line-height: 1;
  }

  &:hover {
    background-image: var(--btn-primary-color);
    color: white;
  }
`;

function Player({ children }) {
  return (
    <PlayerContainer>
      <section className="text">{children}</section>
      <section className="icon">
        <WristbandIcon />
      </section>
    </PlayerContainer>
  );
}

export function PlayerList() {
  return (
    <Container>
      <Player assigned={true}>pavlos</Player>
      <Player assigned={false}>grigoris</Player>
      <Player assigned={false}>grigoris</Player>
      <Player assigned={false}>grigoris</Player>
    </Container>
  );
}
