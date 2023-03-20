import * as React from "react";
import { SvgTooltip, SvgBall, Svg, SvgButton } from "/src/components/svgs";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as TrashIcon } from "/assets/icons/trash_1.svg";
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
    font-size: 1.1rem;
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

const StyleTooltipContent = styled(TooltipContent)`
  background-color: white;
  padding: 5px 8px;
  font-size: 1rem;
  box-shadow: var(--card-basic-shadow-2);
  border-radius: 4px;
  font-family: NoirPro-Light;
  letter-spacing: 2px;
`;

const StylePlayerActionbarItemWristbandPair = styled(SvgBall)`
  &:hover {
    cursor: ${({ disable }) => (disable ? "revert" : "pointer")};
  }

  background-color: ${({ wristbandColorCode }) => {
    if (!wristbandColorCode) {
      return "var(--grey-1)";
    }

    return mapWristbandColorCode(wristbandColorCode);
  }};

  ${({ pairing }) => (pairing ? animatePairing : "")};
`;

function PlayerActionbarItemRosterRemove({
  player,
  onRemovePlayerRoster = () => {},
  size,
  ...props
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() => player.assigned && onRemovePlayerRoster(player)}
        {...props}
      >
        <SvgButton size={size || "30px"}>
          <TrashIcon />
        </SvgButton>
      </TooltipTrigger>
      <StyleTooltipContent>remove player</StyleTooltipContent>
    </Tooltip>
  );
}

function PlayerActionbarItemWristbandPair({
  player,
  onWristbandPair = () => {},
  size,
  disable = false,
  ...props
}) {
  disable ??= !player.assigned;

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={(e) => {
          e.stopPropagation();
          player.assigned && onWristbandPair(player);
        }}
        {...props}
      >
        <StylePlayerActionbarItemWristbandPair
          disable={disable}
          pairing={player.wristband.pairing}
          wristbandColorCode={player.wristband.colorCode}
          size={size || "30px"}
        >
          <Signal />
        </StylePlayerActionbarItemWristbandPair>
      </TooltipTrigger>
      <StyleTooltipContent>pair wristband</StyleTooltipContent>
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

function PlayerActionbarItemPrice({ size, cost, className }) {
  return (
    <StylePlayerActionbarItemPrice className={className}>
      <p className="price">{cost.netPersonCost}</p>
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
