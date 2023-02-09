import * as React from "react";
import styled from "styled-components";

const StylePanelHeaderNavbar = styled.nav`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: block;
  /* Dimensions */
  width: max-content;
  height: 100%;
  padding: 10px;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutNavbar = styled.ul`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  /* Dimensions */
  width: max-content;
  height: 100%;
  /* Position */
  /* Fonts */
  /* Effects */
  list-style: none;
  /* Children */
`;

function PanelHeaderNavbar({ children }) {
  return (
    <StylePanelHeaderNavbar>
      <StyleLayoutNavbar>{children}</StyleLayoutNavbar>
    </StylePanelHeaderNavbar>
  );
}

export { PanelHeaderNavbar };
