import * as React from "react";
import styled from "styled-components";
import { ReactComponent as WristbandIcon } from "/assets/icons/wristband_image.svg";

const StyleWristbandStatus = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  /* Dimensions */
  height: 100%;
  width: 100%;
  /* Position */
  /* Fonts */
  /* Effects */
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
  border: 3px solid transparent;
  border-radius: var(--border-radius-2);

  &.pairing {
    border-color: var(--success);
    animation: pairing 1s infinite;
  }

  @keyframes pairing {
    50% {
      border-color: white;
    }
  }
  /* Children */
`;

function WristbandStatus({ pairing, className }) {
  return (
    <StyleWristbandStatus
      className={className + `${pairing ? " pairing" : ""}`}
    >
      <WristbandIcon />
    </StyleWristbandStatus>
  );
}

export { WristbandStatus };
