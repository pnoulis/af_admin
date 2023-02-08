import {
  StyleLayoutSite,
  StyleLayoutSiteHeader,
  StyleLayoutSiteMain,
  StyleLayoutSiteSidebar,
} from "./layout";
import { SiteSidebar } from "./sidebar";
import { SiteHeader } from "./header";

function Site({ children }) {
  return (
    <StyleLayoutSite>
      <StyleLayoutSiteHeader>
        <SiteHeader />
      </StyleLayoutSiteHeader>
      <StyleLayoutSiteSidebar>
        <SiteSidebar />
      </StyleLayoutSiteSidebar>
      <StyleLayoutSiteMain>{children}</StyleLayoutSiteMain>
    </StyleLayoutSite>
  );
}

export { Site };
