import * as React from "react";
import styled from "styled-components";
import { Sidebar } from "/src/components/sidebars";

const Container = styled.div`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  padding: 50px;
  background-color: lightblue;
`;

const SidebarContainer = styled.div`
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  height: 100%;
  width: 300px;
  background-color: yellow;
`;

function Test() {
  const myRef = React.useRef(null);

  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </Container>
  );
}

const testRoutes = [
  {
    path: "/test",
    element: <Test />,
  },
];

export { testRoutes };
