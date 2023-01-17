import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
all: unset;
box-sizing: border-box;
width: 100%;
height: 100%;
display: grid;
grid-template-rows: minmax(130px, max-content) 1fr;
grid-template-columns: 1fr;
grid-template-areas: "Header" "Main";
background-color: var(--background-contrast);
border-radius: var(--border-radius-2);
box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
padding: 20px;

header {
background-color: green;
}

.panel-main {
background-color: yellow;
}

`;

const ContainLayouts = styled.div`
display: flex;
gap: 20px;
flex-flow: column nowrap;
width: 100%;
height: 500px;
`;

function Panel_1() {
  return (
    <Panel>
      <header>header</header>
      <section className='panel-main'>main</section>
    </Panel>
  );
}

export function Layouts_1() {
  return (
    <React.Fragment>
      <ContainLayouts>
        <p>panel layout</p>
        <Panel_1/>
      </ContainLayouts>
    </React.Fragment>
  );
}
