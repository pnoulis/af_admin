import * as React from "react";
import styled from "styled-components";

const StylePackage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Package() {
  return <StylePackage>packages list item</StylePackage>;
}

export { Package };
