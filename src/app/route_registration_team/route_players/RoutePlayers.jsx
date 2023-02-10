import * as React from "react";
import styled from 'styled-components';
import { AddPlayer } from './add_player';


const StyleLayoutRoutePlayers = styled.div`
all: unset;
/* Type */
box-sizing: border-box;
display: grid;
grid-template-rows: 1fr;
grid-template-columns: 1fr 1fr;
grid-template-areas: "add_player register_wristband";
/* Dimensions */
width: 100%;
height: 100%;
/* Position */
/* Fonts */
/* Effects */
/* Children */
`;

const StyleLayoutItemAddPlayer = styled(AddPlayer)`
grid-area: add_player;
`;

function RoutePlayers() {
  return (
    <StyleLayoutRoutePlayers>
      <StyleLayoutItemAddPlayer/>
    </StyleLayoutRoutePlayers>
  );
}

export { RoutePlayers };
