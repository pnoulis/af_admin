import * as React from "react";
import styled, {keyframes, css} from "styled-components";
import { ReactComponent as WristbandIcon } from "/assets/icons/wristband_image.svg";

const animate = keyframes`
50% {
fill: var(--grey-1);
}
`;
const animatePairing = css`
  border-color: var(--success);

.handBracelet .circle {
fill: var(--success);
animation: ${animate} 1s infinite;
}
`;

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
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5); //black with 30% opacity
  border: 4px solid transparent;
  border-radius: var(--border-radius-2);

${({ pairing }) => (pairing ? animatePairing : '')}

    /* Children */
`;



function WristbandStatus({ pairing, className }) {
  return (
    <StyleWristbandStatus
      pairing={pairing}
      className={className}
    >
      <WristbandIcon />
    </StyleWristbandStatus>
  );
}

export { WristbandStatus };
