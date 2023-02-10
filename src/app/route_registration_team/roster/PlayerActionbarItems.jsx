import * as React from 'react';
import { SvgTooltip, SvgBall, Svg } from '/src/components/svgs';
import styled from 'styled-components';
import { ReactComponent as Trash } from "/assets/icons/trash_1.svg";
import { ReactComponent as Signal } from "/assets/icons/signal_1.svg";
import { ReactComponent as Cancel } from "/assets/icons/cancel_1-cropped.svg";
import { ReactComponent as EuroIcon } from "/assets/icons/euro-cropped.svg";
import { ReactComponent as DiscountIcon } from "/assets/icons/discount-cropped.svg";

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


function PlayerActionbarItemRosterRemove() {
  return (
    <SvgTooltip title='remove player' size='30px'>
      <Trash/>
    </SvgTooltip>
  );
}

function PlayerActionbarItemWristbandPair({size}) {
  return (
    <SvgTooltip title='pair wristband' size={size || '30px'}>
      <Signal/>
    </SvgTooltip>
  );
}

function PlayerActionbarItemDiscount() {
  return (
    <SvgTooltip title='add discount' size='30px'>
      <DiscountIcon/>
    </SvgTooltip>
  );
}

function PlayerActionbarItemPrice() {
  return (
    <StylePlayerActionbarItemPrice>
      <p className='price'>300,5</p>
      <SvgBall className='svgball' size='28px' color='var(--primary-strong)'>
        <EuroIcon/>
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
