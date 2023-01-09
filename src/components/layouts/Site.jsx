import styled from 'styled-components';


const LayoutSite = styled.div`
all: unset;
box-sizing: border-box;
display: grid;

// Dimensions
min-width: 100%;
min-height: 100%;

// Contents
grid-template-rows: minmax(40px, min-content) 1fr;
grid-template-columns: 250px 1fr;
grid-template-areas:
"Sidebar Header"
"Sidebar Main";


// Appearance
background-color: var(--background);

.site--header {
grid-area: Header;
}

.site--sidebar {
grid-area: Sidebar;
}

.site--main {
grid-area: Main;
margin: 20px 20px 20px 50px;
}

`;

export {LayoutSite};
