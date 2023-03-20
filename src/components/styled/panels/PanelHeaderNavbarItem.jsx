import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Svg } from "/src/components/svgs";
import { createRipple } from "/src/lib";

const StyleLayoutNavbarItem = styled.li`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  width: 100px;
  height: 100%;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutNavLink = styled(NavLink)`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.4em;
  /* Dimensions */
  width: 100%;
  height: 100%;
  padding: 0.7em;
  /* Position */
  position: relative;
  overflow: hidden;
  /* Fonts */
  /* Effects */
  cursor: pointer;
  border-radius: var(--border-radius-1);
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);
  background-color: rgb(48, 25, 52);
  transition: transform 0.5s, background-color 0.5s;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    background-color: var(--link-icon-active-color);
  }

  /* Children */
`;

const StyleLayoutNavlinkItemIcon = styled.div`
  all: unset;
  // Type
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  // Dimensions
  flex: 1;
  // Position
  // Fonts
  // Effects
  fill: white;
  // Children

  & .navlinkItemIcon {
    fill: white;
    width: ${({ size }) => size || "44px"};
    height: ${({ size }) => size || "44px"};
  }
`;

const StyleLayoutNavlinkItemText = styled.p`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  /* Fonts */
  text-align: center;
  font-size: var(--text-xs);
  text-transform: uppercase;
  font-family: NoirPro-Medium;
  letter-spacing: 0.5px;
  word-spacing: 1px;
  white-space: wrap;
  color: var(--text-on-dark-basic);
  /* Effects */
  /* Children */
`;

function PanelHeaderNavbarItem({
  path,
  label,
  renderIcon,
  iconSize,
  end = true,
  ...props
}) {
  return (
    <StyleLayoutNavbarItem>
      <StyleLayoutNavLink to={path} onClick={createRipple} end={end}>
        <StyleLayoutNavlinkItemIcon size={iconSize}>
          <Svg className="navlinkItemIcon">{renderIcon}</Svg>
        </StyleLayoutNavlinkItemIcon>
        <StyleLayoutNavlinkItemText>{label}</StyleLayoutNavlinkItemText>
      </StyleLayoutNavLink>
    </StyleLayoutNavbarItem>
  );
}

export { PanelHeaderNavbarItem };
