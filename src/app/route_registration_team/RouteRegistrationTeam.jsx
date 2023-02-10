import * as React from "react";
import { Outlet } from "react-router-dom";
import {
  StyleLayoutPanel,
  StyleLayoutPanelItemMain,
} from "/src/components/styled/panels";
import { RegistrationPanelHeader } from "./RegistrationPanelHeader";
import { RegistrationProvider } from "./store";

function RouteRegistrationTeam() {
  return (
    <RegistrationProvider>
      <StyleLayoutPanel>
        <RegistrationPanelHeader />
        <StyleLayoutPanelItemMain>
          <Outlet />
        </StyleLayoutPanelItemMain>
      </StyleLayoutPanel>
    </RegistrationProvider>
  );
}

export { RouteRegistrationTeam };
