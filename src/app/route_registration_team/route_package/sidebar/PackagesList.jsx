import * as React from "react";
import styled from "styled-components";
import { Package } from "./Package";
import { AddPackage } from "./AddPackage";
import { useRegistrationContext } from "/src/app/route_registration_team";
import { NavLink } from "react-router-dom";

const StylePackagesList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 10px 0;
`;

const StyleScrollableContent = styled.div`
  overflow: scroll;
  flex: 1 1 600px;
`;

const StyleScrollableContentItem = styled(NavLink)`
  display: block;
  background-color: pink;
  height: 100px;
`;

const StylePackagesListToolbar = styled.div`
  flex: 0 0 10%;
  background-color: red;
`;

function PackagesList({ className, ...props }) {
  const { state, dispatchRegistration } = useRegistrationContext();
  console.log(state);

  // React.useEffect(() => {
  //   if (state.active?.packages.length === 0) {
  //     dispatchRegistration({ type: "add_package" });
  //   }

  //   return () => dispatchRegistration({ type: "remove_package", name: "new" });
  // }, []);

  return (
    <StylePackagesList className={className} {...props}>
      <StylePackagesListToolbar>
        <AddPackage />
      </StylePackagesListToolbar>
      <StyleScrollableContent>
        {state.active?.packages.map((afpackage, i) => (
          <StyleScrollableContentItem to={afpackage.name} key={i}>
            {i}
          </StyleScrollableContentItem>
        ))}
      </StyleScrollableContent>
    </StylePackagesList>
  );
}

export { PackagesList };
