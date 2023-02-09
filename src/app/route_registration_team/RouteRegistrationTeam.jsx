import * as React from "react";
import { Outlet } from "react-router-dom";
import {
  StyleLayoutPanel,
  StyleLayoutPanelItemMain,
} from "/src/components/styled/panels";
import { RegistrationPanelHeader } from "./RegistrationPanelHeader";

function RouteRegistrationTeam() {
  return (
    <StyleLayoutPanel>
      <RegistrationPanelHeader />
      <StyleLayoutPanelItemMain>
        <Outlet />
      </StyleLayoutPanelItemMain>
    </StyleLayoutPanel>
  );
}

export { RouteRegistrationTeam };
