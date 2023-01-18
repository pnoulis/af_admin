import React, { forwardRef, useEffect, useRef } from "react";
import { Card_0 as Card } from "/src/components/cards";
import { Icon_0 as Icon } from "/src/components/icons";
import styled from "styled-components";
import { SvgBall, Svg, SvgButton, SvgTooltip } from "/src/components/svgs";

import { ReactComponent as DiscountIcon } from "/assets/icons/discount-cropped.svg";
import { ReactComponent as AddPlayerIcon } from "/assets/icons/add_player-cropped.svg";
import { ReactComponent as CreateTeamIcon } from "/assets/icons/merge_team.svg";
import { ReactComponent as AddPackageIcon } from "/assets/icons/add_package.svg";
import AddPackage from "/assets/icons/add_package.svg";
import { Tooltip, IconButton } from "@mui/material";

const RoundedIcon = styled(Icon)`
  // background-color: var(--grey-1);
  // border-radius: 50%;
`;

const MyTooltip = styled(SvgTooltip)`
  &:hover {
    background-color: red;
  }
`;

// const MyIcon = styled("div")`
//   display: flex;
//   width: 30px;
//   height: 30px;
//   background-color: var(--grey-1);
//   border-radius: 50%;
//   align-items: center;
//   justify-content: center;
// `;

// const MyIcon2 = styled(Svg)`
//   display: inline-block;
//   padding: calc(1%);
// `;

// const MySvgBall = styled(SvgBall2)`
//   background-color: red;
// `;

function PackageSection() {
  const aRef = useRef(null);
  return (
    <Card>
      <div>this is the package section</div>
      <RoundedIcon size="2">
        <AddPlayerIcon />
      </RoundedIcon>
      <RoundedIcon size="4">
        <CreateTeamIcon />
      </RoundedIcon>
      <RoundedIcon size="6">
        <AddPackageIcon />
      </RoundedIcon>
      <RoundedIcon size="8">
        <DiscountIcon />
      </RoundedIcon>
      <SvgBall size={5}>
        <DiscountIcon />
      </SvgBall>
      <SvgButton size={5}>
        <DiscountIcon />
      </SvgButton>
      <SvgTooltip size={5}>
        <DiscountIcon />
      </SvgTooltip>
      <MyTooltip size={5}>
        <DiscountIcon />
      </MyTooltip>
    </Card>
  );
}

export default PackageSection;
