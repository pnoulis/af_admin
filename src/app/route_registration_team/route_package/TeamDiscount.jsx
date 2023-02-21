import * as React from "react";
import styled from "styled-components";
import { Svg } from "/src/components/svgs";
import { ReactComponent as DiscountIcon } from "/assets/icons/discount-cropped.svg";

const StyleTeamDiscount = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyleDiscountIcon = styled(Svg)`
  width: 100px;
  height: 100px;
  fill: var(--primary-medium);
  cursor: pointer;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.3);
  }
`;

const StyleTeamDiscountHeader = styled.header`
  font-family: NoirPro-Medium;
  font-size: var(--text-xxl);
  text-transform: uppercase;
  text-align: center;
`;

function TeamDiscount({ className }) {
  return (
    <StyleTeamDiscount className={className}>
      <StyleTeamDiscountHeader>Discounts</StyleTeamDiscountHeader>
      <StyleDiscountIcon>
        <DiscountIcon />
      </StyleDiscountIcon>
    </StyleTeamDiscount>
  );
}

export { TeamDiscount };
