import styled from "styled-components";

const StylePanel = styled.div`
  all: unset;
  box-sizing: border-box;
  display: grid;

  // Dimensions
  min-width: 100%;
  min-height: 100%;
  max-height: 100vw;

  // Contents
  grid-template-rows: minmax(130px, max-content) 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "Header" "Main";
  gap: 50px;

  // Appearance
  background-color: var(--background-contrast);
  border-radius: var(--border-radius-2);
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
  padding: 20px;

  .panel--header {
    grid-area: Header;
  }
`;

const StylePanelMain = styled.section`
  grid-area: Main;
  box-sizing: border-box;
  min-width: 100%;
  min-height: 100%;
`;

export { StylePanel, StylePanelMain };
