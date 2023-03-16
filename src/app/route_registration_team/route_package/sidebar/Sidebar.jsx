import * as React from "react";
import { PackagesList } from "./PackagesList";
import styled from "styled-components";
import { ButtonText } from "/src/components/buttons";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useRegistrationContext,
  PACKAGE_SCHEMA,
} from "/src/app/route_registration_team";

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
  const { state, dispatchRegistration } = useRegistrationContext();
  const navigate = useNavigate();

  const handleAddPackageClick = (e) => {
    const newPkg = Math.random().toString(16).slice(2, 8);
    navigate(`./${newPkg}`);
    // dispatchRegistration({
    //   type: "set_packages",
    //   packages: [
    //     ...state.active.packages,
    //     {
    //       ...PACKAGE_SCHEMA,
    //       name: `pkg_#${
    //         state.active.packages.length === 0
    //           ? 1
    //           : state.active.packages.length
    //       }`,
    //     },
    //   ],
    // });
  };

  React.useEffect(() => {
    if (state.active.packages.length === 0) {
      handleAddPackageClick();
      return;
    }

    // if (!/\d+$/.test(location)) {
    //   navigate(`./${state.active.packages[0].id}`);
    // }
  }, []);

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
