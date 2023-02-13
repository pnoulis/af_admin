import * as React from "react";
import { SvgTooltip, SvgBall, Svg } from "/src/components/svgs";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as Trash } from "/assets/icons/trash_1.svg";
import { ReactComponent as Signal } from "/assets/icons/signal_1.svg";
import { ReactComponent as EuroIcon } from "/assets/icons/euro-cropped.svg";
import { ReactComponent as DiscountIcon } from "/assets/icons/discount-cropped.svg";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "/src/components/tooltips";
import { mapWristbandColorCode } from "/src/misc";

const StylePlayerActionbarItemPrice = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;

  & .price {
    position: relative;
    top: 4px;
    font-size: 1.2rem;
    font-family: NoirPro-Medium;
    color: var(--primary-strong);
  }

  & .svgball {
    justify-content: flex-start;
  }
`;

const animate = keyframes`
50% {
background-color: var(--grey-1);
}
`;
const animatePairing = css`
  background-color: var(--success);
  animation: ${animate} 1s infinite;
`;

const StylePlayerActionbarItemWristbandPair = styled(SvgBall)`
  &:hover {
    cursor: pointer;
  }

  background-color: ${({ wristbandColorCode }) => {
    if (!wristbandColorCode) {
      return "var(--grey-1)";
    }

    return mapWristbandColorCode(wristbandColorCode);
  }};

  ${({ pairing }) => (pairing ? animatePairing : "")};
`;

function PlayerActionbarItemRosterRemove({ size }) {
  return (
    <SvgTooltip title="remove player" size={size || "30px"}>
      <Trash />
    </SvgTooltip>
  );
}

function PlayerActionbarItemWristbandPair({
  pairing,
  wristbandColorCode,
  size,
  ...props
}) {
  return (
    <Tooltip>
      <TooltipTrigger {...props}>
        <StylePlayerActionbarItemWristbandPair
          className={pairing ? " pairing" : ""}
          pairing={pairing}
          wristbandColorCode={wristbandColorCode}
          size={size || "30px"}
        >
          <Signal />
        </StylePlayerActionbarItemWristbandPair>
      </TooltipTrigger>
      <TooltipContent>pair wristband</TooltipContent>
    </Tooltip>
  );
}

function PlayerActionbarItemDiscount({ size }) {
  return (
    <SvgTooltip title="add discount" size={size || "30px"}>
      <DiscountIcon />
    </SvgTooltip>
  );
}

function PlayerActionbarItemPrice({ size }) {
  return (
    <StylePlayerActionbarItemPrice>
      <p className="price">300,5</p>
      <SvgBall
        className="svgball"
        size={size || "28px"}
        color="var(--primary-strong)"
      >
        <EuroIcon />
      </SvgBall>
    </StylePlayerActionbarItemPrice>
  );
}

export {
  PlayerActionbarItemRosterRemove,
  PlayerActionbarItemWristbandPair,
  PlayerActionbarItemDiscount,
  PlayerActionbarItemPrice,
};
