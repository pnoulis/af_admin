import * as React from "react";
import styled from "styled-components";

const StyleLayoutPlayerActionbar = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
  /* Dimensions */
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

function PlayerActionbar({ className, children, ...props }) {
  return (
    <StyleLayoutPlayerActionbar className={className} {...props}>
      {children}
    </StyleLayoutPlayerActionbar>
  );
}

export { PlayerActionbar };
