import * as React from "react";
import styled from 'styled-components';
import { TeamDiscount } from './TeamDiscount';
import { TeamRoster } from './TeamRoster';
import { Packages } from './Packages';

const StyleLayoutRoutePackage = styled.div`
  all: unset;
  box-sizing: border-box;
  /* Type */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'packages packages' 'team_discount player_discounts';
  /* Dimensions */
  width: 100%;
  height: 100%;
  padding-top: 50px;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutItemPackages = styled(Packages)`
grid-area: packages;
grid-column-start: 1;
grid-column-end: 3;
`
const StyleLayoutItemTeamDiscount = styled(TeamDiscount)`
grid-area: team_discount;
`
const StyleLayoutItemTeamRoster = styled(TeamRoster)`
grid-area: player_discounts;
`

function RoutePackage() {
  return <StyleLayoutRoutePackage>
    <StyleLayoutItemPackages />
    <StyleLayoutItemTeamDiscount />
    <StyleLayoutItemTeamRoster />
  </StyleLayoutRoutePackage>;
}

export { RoutePackage };
