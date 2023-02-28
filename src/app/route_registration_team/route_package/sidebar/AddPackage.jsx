import * as React from "react";
import styled from "styled-components";
import { useRegistrationContext } from "/src/app/route_registration_team";

const StyleAddPackage = styled.div``;

function AddPackage() {
  const { state, dispatchRegistration } = useRegistrationContext();

  const handleAddPackage = (e) => {
    e.preventDefault();
    dispatchRegistration({ type: "add_package" });
  };

  return (
    <StyleAddPackage onClick={handleAddPackage}>add package</StyleAddPackage>
  );
}

export { AddPackage };
