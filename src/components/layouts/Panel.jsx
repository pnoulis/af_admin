import styled from 'styled-components';

const LayoutPanel = styled.div`
all: unset;
box-sizing: border-box;
display: grid;

// Dimensions
min-width: 100%;
min-height: 100%;

// Contents
grid-template-rows: minmax(130px, max-content) 1fr;
grid-template-columns: 1fr;
grid-template-areas: "Header" "Main";

// Appearance
background-color: var(--background-contrast);
border-radius: var(--border-radius-2);
box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
padding: 20px;

.panel--header {
grid-area: Header;
}

.panel--main {
grid-area: Main;
}
`;

export { LayoutPanel };
