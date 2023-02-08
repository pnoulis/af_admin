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
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "/src/components/dropdowns";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "/src/components/tooltips";

import { Menu, MenuItem } from "/src/components/menus";

import { useHover } from "/src/hooks";

function PackageSection() {
  const aRef = useRef(null);
  const [hover, bindHover] = useHover();

  return (
    <Card>
      <div>this is the package section</div>
      <MenuItem label="yolo">broah</MenuItem>
      <p {...bindHover}>{hover ? "yolo" : "drone"}</p>
    </Card>
  );
}

export default PackageSection;
