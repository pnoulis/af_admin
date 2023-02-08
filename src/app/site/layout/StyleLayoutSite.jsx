import styled from "styled-components";

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
  max-width: 1920px;
  max-height: 1080px;
  /* Position */
  margin: auto;
  /* Fonts */
  /* Effects */
  background-color: var(--background);
  /* Children */
`;

export { StyleLayoutSite };
