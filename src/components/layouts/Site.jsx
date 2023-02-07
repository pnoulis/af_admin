import styled from 'styled-components';

const StyleLayoutSite = styled.div`
all: unset;
box-sizing: border-box;
display: grid;

// Dimensions
width: 100%;
height: 100%;
max-width: 1920px;
max-height: 1080px;
margin: auto;

// Contents
grid-template-rows: minmax(40px, min-content) 1fr;
grid-template-columns: 250px 1fr;
grid-template-areas:
"Sidebar Header"
"Sidebar Main";

// Appearance
background-color: var(--background);
`;

export { StyleLayoutSite };
