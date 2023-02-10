import * as React from 'react';
import styled from 'styled-components';

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

function PlayerActionbar({children}) {
  return (
    <StyleLayoutPlayerActionbar>
      {children}
    </StyleLayoutPlayerActionbar>
  );
}

export { PlayerActionbar };
