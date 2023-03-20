import * as React from "react";
import styled from "styled-components";
import { Sidebar } from "./sidebar";
import { Outlet } from "react-router-dom";

const StyleRoutePackage = styled.div`
  all: unset;
  box-sizing: border-box;
  // Type
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    "sidebar packages packages"
    "sidebar team_discount players_discount";
  // Dimensions
  width: 100%;
  height: 100%;
  padding-top: 30px;
  // Position
  // Fonts
  // Effects
  // Children
`;

const StylePackages = styled.section`
  grid-area: packages;
  background-color: green;
  width: 100%;
  height: 100%;
`;

const StyleTeamDiscount = styled.section`
  grid-area: team_discount;
  background-color: yellow;
  width: 100%;
  height: 100%;
`;

const StylePlayersDiscount = styled.section`
  grid-area: players_discount;
  background-color: pink;
  width: 100%;
  height: 100%;
`;

const StyleSidebar = styled(Sidebar)`
  grid-area: sidebar;
`;

function RoutePackages() {
  return (
    <StyleRoutePackage>
      <StyleSidebar />
      <Outlet />
      {/* <StylePackages>packages</StylePackages> */}
      {/* <StyleTeamDiscount>team discount</StyleTeamDiscount> */}
      {/* <StylePlayersDiscount>players discount</StylePlayersDiscount> */}
    </StyleRoutePackage>
  );
}

export { RoutePackages };
