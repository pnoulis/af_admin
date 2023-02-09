import styled from "styled-components";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { LangWidget } from "./LangWidget";
import { TimeWidget } from "./TimeWidget";
import background from "/assets/backgrounds/sidebar.png";
import { linkRegistrationTeam } from "/src/app/links";

const StyleLayoutSidebar = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  /* Dimensions */
  width: 100%;
  height: 100%;
  padding: 2px 14px;
  /* Position */
  grid-area: sidebar;
  /* Fonts */
  /* Effects */
  background-image: url(${background});
  /* Children */
`;

const StyleLayoutSidebarItemHeader = styled.header`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  flex: 0 1 200px;
  /* Position */
  align-self: stretch;
  /* Fonts */
  /* Effects */
  /* Children */
`;
const StyleLayoutSidebarItemLine = styled.hr`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  height: 2px;
  width: 100%;
  /* Position */
  /* Fonts */
  /* Effects */
  background-color: white;
  /* Children */
`;
const StyleLayoutSidebarItemNavbar = styled.nav`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  flex: 1;
  padding: 15px 0 20px 0;
  /* Position */
  align-self: stretch;
  /* Fonts */
  /* Effects */
  /* Children */
`;
const StyleLayoutSidebarItemTimeWidget = styled.section`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;
const StyleLayoutSidebarItemLangWidget = styled.section`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  margin-top: 30px;
  margin-bottom: 20px;
  /* Fonts */
  /* Effects */
  /* Children */
`;

function Sidebar() {
  return (
    <StyleLayoutSidebar>
      <StyleLayoutSidebarItemHeader>
        <Header />
      </StyleLayoutSidebarItemHeader>
      <StyleLayoutSidebarItemLine />
      <StyleLayoutSidebarItemNavbar>
        <Navbar items={[linkRegistrationTeam]} />
      </StyleLayoutSidebarItemNavbar>
      <StyleLayoutSidebarItemTimeWidget>
        <TimeWidget />
      </StyleLayoutSidebarItemTimeWidget>
      <StyleLayoutSidebarItemLangWidget>
        <LangWidget />
      </StyleLayoutSidebarItemLangWidget>
    </StyleLayoutSidebar>
  );
}

export { Sidebar };
