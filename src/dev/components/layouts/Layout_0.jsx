import React from 'react';
import styled from 'styled-components';


const Site = styled.div`
all: unset;
box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: var(--background);
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "Sidebar Header"
    "Sidebar Main";

header {
grid-area: Header;
background-color: red;
min-height: 40px;
}

aside {
grid-area: Sidebar;
background-color: yellow;
}

main {
grid-area: Main;
background-color: green;
margin: 20px 20px 20px 50px;
}
`;


function Layout_1() {
  return (
    <Site>
      <header>header</header>
      <aside>sidebar</aside>
      <main>panel layout</main>
    </Site>
  );
}
const ContainLayouts = styled.div`
display: flex;
gap: 20px;
flex-flow: column nowrap;
width: 100%;
height: 500px;
`;

export function Layouts() {
  return (
    <React.Fragment>
      <ContainLayouts>
        <p>app layout</p>
        <Layout_1/>
      </ContainLayouts>
    </React.Fragment>
  );
}
