import * as React from "react";
import { PackagesList } from "./PackagesList";
import styled from "styled-components";
import { ButtonText } from "/src/components/buttons";
import { useNavigate, useLocation } from "react-router-dom";
import { useTeamsContext, PACKAGE_SCHEMA } from "/src/app/route_teams";

const StyleSidebar = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  gap: 20px;
`;

const StyleAddPackageButton = styled(ButtonText)`
  width: 100%;
  height: 50px;
`;

function Sidebar(props) {
  const { state, dispatch } = useTeamsContext();
  const navigate = useNavigate();

  const handleAddPackageClick = (e) => {
    if (state.active.packages.find((pkg) => pkg.status === 0)) {
      return;
    }
    const newPkg = Math.random().toString(16).slice(2, 8);
    dispatch({
      type: "set_packages",
      packages: [
        ...state.active.packages,
        {
          ...PACKAGE_SCHEMA,
          id: newPkg,
          name: newPkg,
        },
      ],
    });
  };

  React.useEffect(() => {
    if (state.active.packages.length === 0) {
      handleAddPackageClick();
      return;
    }
  }, [state.active.packages]);

  React.useEffect(() => {
    const last = state.active.packages[state.active.packages.length - 1];
    if (last) {
      navigate(`./${last.id}`);
    }
  }, [state.active.packages]);

  return (
    <StyleSidebar {...props}>
      <StyleAddPackageButton onClick={handleAddPackageClick}>
        new package
      </StyleAddPackageButton>
      <PackagesList />
    </StyleSidebar>
  );
}

export { Sidebar };
