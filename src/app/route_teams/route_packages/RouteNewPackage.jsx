import * as React from "react";
import styled from "styled-components";
import {
  useTeamsContext,
  PACKAGE_SCHEMA,
  PACKAGE_STATUS,
} from "/src/app/route_teams";
import { mapPackageStatus } from "/src/misc";

import { useParams } from "react-router-dom";
import { Packages } from "./Packages";
import { SvgButton } from "/src/components/svgs";
import { ReactComponent as TrashIcon } from "/assets/icons/trash_1.svg";
import { ReactComponent as SaveIcon } from "/assets/icons/save_1.svg";
import { ReactComponent as UploadIcon } from "/assets/icons/upload_1.svg";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "/src/components/tooltips";

const StyleSvgButton = styled(SvgButton)`
  background-color: var(--primary-strong);
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

function RemovePackage({ onRemovePackage }) {
  return (
    <div onClick={onRemovePackage}>
      <Tooltip>
        <TooltipTrigger>
          <StyleSvgButton size="30px" color="white">
            <TrashIcon />
          </StyleSvgButton>
        </TooltipTrigger>
        <StyleTooltipContent>remove package</StyleTooltipContent>
      </Tooltip>
    </div>
  );
}

function SavePackage({ onSavePackage }) {
  return (
    <div onClick={onSavePackage}>
      <Tooltip>
        <TooltipTrigger>
          <StyleSvgButton size="30px" color="white">
            <SaveIcon />
          </StyleSvgButton>
        </TooltipTrigger>
        <StyleTooltipContent>save package</StyleTooltipContent>
      </Tooltip>
    </div>
  );
}

function UploadPackage({ onUploadPackage }) {
  return (
    <div onClick={onUploadPackage}>
      <Tooltip>
        <TooltipTrigger>
          <StyleSvgButton size="30px" color="white">
            <UploadIcon />
          </StyleSvgButton>
        </TooltipTrigger>
        <StyleTooltipContent>upload package</StyleTooltipContent>
      </Tooltip>
    </div>
  );
}

const StyleLayoutRoutePackage = styled.div`
  all: unset;
  box-sizing: border-box;
  //Type
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content 1fr 1fr;
  grid-template-areas: "header header" "packages packages" "team_discount player_discounts";
  //Dimensions
  width: 100%;
  height: 100%;
  gap: 30px;
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
// const StyleLayoutItemTeamDiscount = styled(TeamDiscount)`
//   grid-area: team_discount;
// `;
const StyleHeader = styled.header`
  width: 100%;
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  gap: 30px;
  justify-content: flex-end;
  align-items: center;
  padding: 0 25px 50px 0;
`;

const StylePackageContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 5px;
`;
const StyleHeaderPkgName = styled.span`
  font-family: NoirPro-Medium;
  color: var(--secondary-strong);
  font-size: var(--text-xxl);
  font-weight: bolder;
  letter-spacing: 1px;
  position: relative;
  top: -3px;
`;

const StyleHeaderPkgStatus = styled.span`
  color: rgb(30, 144, 255);
  font-family: NoirPro-Medium;
  font-size: var(--text-xl);
  font-weight: bolder;
  letter-spacing: 1px;
`;

const StyleHeaderPkgTools = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  flex: 0;
  align-self: center;
  gap: 10px;
`;

const StyleHeaderPkgToolsItem = styled.li``;

function RouteNewPackage() {
  const { state, dispatch } = useTeamsContext();
  const { pkgId } = useParams();
  const [pkg, setPkg] = React.useState({});

  React.useEffect(() => {
    const pkg = state.active.packages.find((pkg) => pkg.id === pkgId);
    if (pkg) {
      console.log("package found");
      console.log(pkg);
      setPkg(pkg);
    }
    console.log("--------------------------------------------------");
    console.log(pkg);
  }, [pkgId]);

  const handlePackageUpload = () => {
    console.log("package upload");
    const team = state.active;
    const isGroup = team.isGroup;
  };

  const handlePackageSave = () => {
    console.log("package save");
  };

  const handlePackageRemove = () => {
    if (pkg.status < PACKAGE_STATUS["registered"]) {
      const newPackages = state.active.packages.filter(
        (afpackage) => afpackage.id !== pkg.id
      );
      dispatch({ type: "set_packages", packages: newPackages });
    }
  };

  return (
    <StyleLayoutRoutePackage>
      <StyleHeader>
        <StylePackageContainer>
          <StyleHeaderPkgStatus>
            [{mapPackageStatus(pkg.status || 0)}]
          </StyleHeaderPkgStatus>
          <StyleHeaderPkgName>pkg:{pkg.id}</StyleHeaderPkgName>
        </StylePackageContainer>
        <StyleHeaderPkgTools>
          <StyleHeaderPkgToolsItem>
            <UploadPackage onUploadPackage={handlePackageUpload} />
          </StyleHeaderPkgToolsItem>
          <StyleHeaderPkgToolsItem>
            <SavePackage onSavePackage={handlePackageSave} />
          </StyleHeaderPkgToolsItem>
          <StyleHeaderPkgToolsItem>
            <RemovePackage onRemovePackage={handlePackageRemove} />
          </StyleHeaderPkgToolsItem>
        </StyleHeaderPkgTools>
      </StyleHeader>
      <StyleLayoutItemPackages />
    </StyleLayoutRoutePackage>
  );
}

const routeNewPackage = {
  path: "/teams/:teamId/packages/:pkgId",
  element: <RouteNewPackage />,
};

const linkNewPackage = {
  path: "/teams/:teamId/packages/:pkgId",
  label: "package",
};

export { RouteNewPackage, routeNewPackage, linkNewPackage };
