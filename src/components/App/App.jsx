import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import Sidebar from '/src/components/Sidebar/index.jsx';
import Header from '/src/components/Header/index.jsx';


const s = {
  Container: styled.div`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "Sidebar Header"
    "Sidebar Main"
`,
  Main: styled.main`
  background-color: yellow;
  grid-area: Main;
  padding: 50px 25px 25px 100px;
`
}

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <s.Container>
        <Header/>
        <Sidebar/>
        <s.Main>
          Main
        </s.Main>
      </s.Container>
    </React.Fragment>
  );
}
