import * as React from "react";
import styled from "styled-components";
import { PackagesList } from "./PackagesList";

const StyleSidebar = styled.aside``;

function Sidebar({ ...props }) {
  return (
    <StyleSidebar {...props}>
      <PackagesList />
    </StyleSidebar>
  );
}

export { Sidebar };
