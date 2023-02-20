import styled from "styled-components";

const StyleLayoutPanel = styled.article`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 115px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "header" "main";
  gap: 20px;
  /* Dimensions */
  width: 100%;
  height: 100%;
  padding: 15px;
  /* Position */
  /* Fonts */
  /* Effects */
  box-shadow: var(--panel-shadow);
  background-color: var(--panel-color);
  border-radius: var(--border-radius-2);
  /* Children */
`;

const StyleLayoutPanelItemHeader = styled.header`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  /* Dimensions */
  /* Position */
  grid-area: header;
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutPanelItemMain = styled.section`
  all: unset;
  /* Type */
  box-sizing: border-box;
  /* Dimensions */
  /* Position */
  grid-area: main;
  /* Fonts */
  /* Effects */
  /* Children */
`;

export {
  StyleLayoutPanel,
  StyleLayoutPanelItemHeader,
  StyleLayoutPanelItemMain,
};
