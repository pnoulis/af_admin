import styled from "styled-components";
import { ButtonText } from "/src/components/buttons";

const PlayerSelectionSectionStyle = styled.section`
  grid-area: PlayerSelection;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "Header" "Workarea";
  gap: 30px;

  & > .grid-workarea {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const RegisterPlayerStyle = styled.div`
  width: 350px;
`;
const SelectPlayerStyle = styled.div`
  width: 350px;
`;
const PlayerSelectionToggleButton = styled(ButtonText)`
  width: 200px;
  height: 50px;
  align-self: flex-start;
`;

const WristbandSectionStyle = styled.section`
  grid-area: Wristband;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 20px;

  .players-status {
    min-height: 200px;
  }

  .wristband-widget {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
    border: 2px solid transparent;
    border-radius: var(--border-radius-2);
  }

  .wristband-widget.pairing {
    border-color: var(--success);
    animation: pairing 1s infinite;
  }

  @keyframes pairing {
    50% {
      border-color: white;
    }
  }
`;

const PlayersListStyle = styled.ul`
  all: unset;
  box-sizing: border-box;
  display: grid;

  // Dimensions
  min-width: 100%;
  min-height: 100%;

  // Contents
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 70px;
  gap: 15px;

  // Appearance
  list-style-type: none;
  outline: none;
  text-decoration: none;
`;

const PlayerStyle = styled.div`
  all: unset;
  box-sizing: border-box;
  display: flex;
  position: relative;
  overflow: hidden;

  // Dimensions
  width: 100%;
  height: 100%;

  // Contents
  flex-flow: row nowrap;
  align-items: center;
  cursor: pointer;

  // Appearance
  padding: 4px 8px;
  border-radius: var(--border-radius-1);
  background-color: white;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);

  // Dynamic

  &.pairing {
    padding: 2px 6px;
    border: 2px solid var(--success);
    animation: pairing 1s infinite;
  }

  @keyframes pairing {
    50% {
      border-color: white;
    }
  }

  .text {
    flex: 1;
    font-size: var(--text-nl);
    letter-spacing: 0.2px;
    word-spacing: 1px;
    white-space: wrap;
    font-weight: bold;
    color: var(--input-text-color);
  }
  .icon1 {
    padding: 4px;
    height: 40px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    margin-right: 15px;
    background-color: var(--grey-1);
    fill: white;
  }

  .icon1.assigned {
    background-color: var(--success);
  }
  .icon2 {
    padding: 8px;
    height: 40px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: var(--grey-1);
    fill: white;

    svg {
      pointer-events: none;
    }
  }

  &:not(.pairing):hover {
    background-image: var(--btn-primary-color);
    .text {
      color: var(--text-on-dark-basic);
    }
  }

  &:has(> .icon2:hover) {
    background-image: none;
    .text {
      color: var(--text);
    }
    .icon2 {
      background-image: var(--btn-primary-color);
    }
  }
`;

export {
  WristbandSectionStyle,
  PlayersListStyle,
  PlayerStyle,
  PlayerSelectionSectionStyle,
  RegisterPlayerStyle,
  SelectPlayerStyle,
  PlayerSelectionToggleButton,
};
