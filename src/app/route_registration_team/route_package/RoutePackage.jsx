import * as React from "react";
import styled from "styled-components";
import { Sidebar } from "./sidebar";

const StyleRoutePackage = styled.div`
  all: unset;
  box-sizing: border-box;
  // Type
  display: grid;
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "sidebar packages packages"
    "sidebar team_discount players_discount";
  // Dimensions
  width: 100%;
  height: 100%;
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
  background-color: lightblue;
`;

function RoutePackage() {
  return (
    <StyleRoutePackage>
      <StyleSidebar>
        <Sidebar />
      </StyleSidebar>
      <StylePackages>packages</StylePackages>
      <StyleTeamDiscount>team discount</StyleTeamDiscount>
      <StylePlayersDiscount>players discount</StylePlayersDiscount>
    </StyleRoutePackage>
  );
}

export { RoutePackage };

// import { TeamDiscount } from "./TeamDiscount";
// import { TeamRoster } from "./TeamRoster";
// import { Packages } from "./Packages";
// import { useRegistrationContext } from "/src/app/route_registration_team";

// const StyleLayoutRoutePackage = styled.div`
//   all: unset;
//   box-sizing: border-box;
//   /* Type */
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: 1fr 1fr;
//   grid-template-areas: "packages packages" "team_discount player_discounts";
//   /* Dimensions */
//   width: 100%;
//   height: 100%;
//   padding-top: 50px;
//   /* Position */
//   /* Fonts */
//   /* Effects */
//   /* Children */
// `;

// const StyleLayoutItemPackages = styled(Packages)`
//   grid-area: packages;
//   grid-column-start: 1;
//   grid-column-end: 3;
// `;
// const StyleLayoutItemTeamDiscount = styled(TeamDiscount)`
//   grid-area: team_discount;
// `;
// const StyleLayoutItemTeamRoster = styled(TeamRoster)`
//   grid-area: player_discounts;
// `;

// function RoutePackage() {
//   const { state, dispatchRegistration } = useRegistrationContext();

//   return (
//     <StyleLayoutRoutePackage>
//       <StyleLayoutItemPackages />
//       <StyleLayoutItemTeamDiscount />
//       <StyleLayoutItemTeamRoster
//         roster={state.active.roster}
//         afpackage={state.active.package}
//       />
//     </StyleLayoutRoutePackage>
//   );
// }

// export { RoutePackage };
