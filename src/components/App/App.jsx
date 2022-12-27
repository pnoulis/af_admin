import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import Sidebar from '/src/components/Sidebar/index.jsx';
import Header from '/src/components/Header/index.jsx';
import GlobalStore from '/src/stores/app.js';


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
  background-color: rgba(160, 169, 200, 0.3);
  grid-area: Main;
  padding: 30px 25px 25px 50px;
  > .page {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    display: flex;
    padding: 20px;
    display: grid;
    gap: 20px;
    grid-template-rows: 130px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "content"

  }
`
}

export default function App() {
  const navigate = useNavigate();
  const { state, dispatch } = GlobalStore.use();

  useEffect(() => {
    if (!state.login) {
      navigate('/login');
    }
  }, [state.login])

  return (
    <React.Fragment>
      <CssBaseline />
      <s.Container>
        <Header />
        <Sidebar />
        <s.Main>
          <div className='page'>
            <Outlet />
          </div>
        </s.Main>
      </s.Container>
    </React.Fragment>
  );
}
