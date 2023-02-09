import styled from "styled-components";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

const StyleLayoutSite = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: grid;
  grid-template-rows: minmax(40px, max-content) 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas: "sidebar header" "sidebar main";
  /* Dimensions */
  width: 100%;
  height: 100%;
  /* Position */
  margin: auto;
  /* Fonts */
  color: black;
  /* Effects */
  background-color: var(--background);
  /* Children */
`;
const StyleLayoutSiteItemHeader = styled.header`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  grid-area: header;
  /* Fonts */
  /* Effects */
  /* Children */
`;
const StyleLayoutSiteItemSidebar = styled.aside`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  grid-area: sidebar;
  /* Fonts */
  /* Effects */
  /* Children */
`;
const StyleLayoutSiteItemMain = styled.main`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  padding: 40px;
  /* Position */
  grid-area: main;
  /* Fonts */
  /* Effects */
  /* Children */
`;

function Site({ children }) {
  return (
    <StyleLayoutSite>
      <StyleLayoutSiteItemHeader>
        <Header />
      </StyleLayoutSiteItemHeader>
      <StyleLayoutSiteItemSidebar>
        <Sidebar />
      </StyleLayoutSiteItemSidebar>
      <StyleLayoutSiteItemMain>{children}</StyleLayoutSiteItemMain>
    </StyleLayoutSite>
  );
}

export { Site };
