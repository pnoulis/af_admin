import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import styled from 'styled-components';
import Sidebar from '/src/components/Sidebar/index.jsx';
import Header from '/src/components/Header/index.jsx';
import GlobalStore from '/src/stores/app.js';


const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(240, 240, 240, 1);
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "Sidebar Header"
    "Sidebar Main"
`;

const Page = styled.main`
  grid-area: Main;
  background-color: white;
  margin: 30px 25px 25px 50px;
  border-radius: 5px;
  display: grid;
  gap: 20px 0;
  padding: 10px 10px 10px 25px;
  grid-template-rows: 130px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
     "Header"
     "Content";
`;


export default function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Container>
        <Header/>
        <Sidebar/>
        <Page>
          <Outlet/>
        </Page>
      </Container>
    </React.Fragment>
  );
}
// export default function App() {
//   const navigate = useNavigate();
//   const { state, dispatch } = GlobalStore.use();

//   useEffect(() => {
//     if (!state.login) {
//       navigate('/login');
//     }
//   }, [state.login]);

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <s.Container>
//         <Header />
//         <Sidebar />
//         <s.Main>
//           <div className='page'>
//             <Outlet />
//           </div>
//         </s.Main>
//       </s.Container>
//     </React.Fragment>
//   );
// }
