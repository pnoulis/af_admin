import * as React from "react";
import styled from "styled-components";
// import { setupMqttProxy } from "/src/mqtt";

const StyleButton = styled.button`
  display: block;
  padding: 10px;
  background-color: blue;
  cursor: pointer;
  margin-bottom: 15px;
`;

function Test() {
  return (
    <div>
      <StyleButton>show params</StyleButton>
      <StyleButton>publish</StyleButton>
      <StyleButton>
        subscribe transient
      </StyleButton>
      <StyleButton>subscribe</StyleButton>
      <p>hi iam test</p>
    </div>
  );
}

const testRoutes = [
  {
    path: "/test",
    element: <Test />,
  },
];

export { testRoutes };
