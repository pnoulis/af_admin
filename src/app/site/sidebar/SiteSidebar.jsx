import styled from "styled-components";
import Header from "./Header";
import Navigation from "./Navigation";
import LangWidget from "./LangWidget";
import TimeWidget from "./TimeWidget";
import background from "/assets/backgrounds/sidebar.png";

const StyleSidebar = styled.aside`
  all: unset;
  box-sizing: border-box;
  display: flex;

  // Dimensions
  min-width: 100%;
  min-height: 100%;

  // Contents
  flex-flow: column nowrap;
  align-items: center;

  // Appearance
  padding: 2px 14px;
  background-image: url(${background});

  // position
  grid-area: Sidebar;
`;

const StyleDivider = styled.hr`
  height: 2px;
  width: 100%;
  background-color: white;
`;

function SiteSidebar() {
  return (
    <StyleSidebar>
      <Header />
      <StyleDivider />
      <Navigation />
      <TimeWidget />
      <LangWidget />
    </StyleSidebar>
  );
}

export { SiteSidebar };
