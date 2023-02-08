import * as React from "react";
import { Outlet } from "react-router-dom";
import { SiteHeader, SiteSidebar } from "./site";
import { StyleLayoutMain, StyleLayoutSite } from "/src/components/layouts";

function App() {
  return (
    <StyleLayoutSite>
      <SiteHeader />
      <SiteSidebar />
      <StyleLayoutMain>
        <Outlet />
      </StyleLayoutMain>
    </StyleLayoutSite>
  );
}

export { App };
