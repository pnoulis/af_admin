import * as React from "react";
import styled from "styled-components";
import {
  useRegistrationContext,
  PACKAGE_SCHEMA,
} from "/src/app/route_registration_team";

import { useParams } from "react-router-dom";
import { TeamDiscount } from "./TeamDiscount";
import { TeamRoster } from "./TeamRoster";
import { Packages } from "./Packages";

const StyleLayoutRoutePackage = styled.div`
  all: unset;
  box-sizing: border-box;
  //Type
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "packages packages" "team_discount player_discounts";
  //Dimensions
  width: 100%;
  height: 100%;
  padding-top: 50px;
  //Position
  //Fonts
  //Effects
  //Children
`;

const StyleLayoutItemPackages = styled(Packages)`
  grid-area: packages;
  grid-column-start: 1;
  grid-column-end: 3;
`;
const StyleLayoutItemTeamDiscount = styled(TeamDiscount)`
  grid-area: team_discount;
`;
const StyleLayoutItemTeamRoster = styled(TeamRoster)`
  grid-area: player_discounts;
`;

function RouteNewPackage() {
  const { state, dispatchRegistration } = useRegistrationContext();
  const { pkgId } = useParams();

  React.useEffect(() => {
    const pkg = state.active.packages.find((pkg) => pkg.id === pkgId);

    if (!pkg) {
      dispatchRegistration({
        type: "set_packages",
        packages: [
          ...state.active.packages,
          {
            ...PACKAGE_SCHEMA,
            id: pkgId,
            name: `pkg_#${state.active.packages.length}`,
          },
        ],
      });
    }
  }, [pkgId]);

  return (
    <StyleLayoutRoutePackage>
      <StyleLayoutItemPackages />
      <StyleLayoutItemTeamDiscount />
    </StyleLayoutRoutePackage>
  );
}

const routeNewPackage = {
  path: "/registration/team/packages/:pkgId",
  element: <RouteNewPackage />,
};

const linkNewPackage = {
  path: "/registration/team/packages/:pkgId",
  label: "package",
};

export { RouteNewPackage, routeNewPackage, linkNewPackage };
