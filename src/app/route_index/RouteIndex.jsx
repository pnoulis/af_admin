import { Outlet } from "react-router-dom";
import { SiteHeader, SiteSidebar } from "/src/app/site";
import { StyleLayoutMain, StyleLayoutSite } from "/src/components/layouts";

function RouteIndex() {
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

export { RouteIndex };
