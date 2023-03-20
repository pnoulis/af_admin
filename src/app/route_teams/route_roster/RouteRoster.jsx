import * as React from "react";
import styled from "styled-components";
import { AddPlayer } from "./add_player";
import { RegisterWristband } from "./register_wristband";

const StyleLayoutRoutePlayers = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: "add_player register_wristband";
gap: 50px;
  /* Dimensions */
  width: 100%;
  height: 100%;
  padding-top: 50px;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const StyleLayoutItemAddPlayer = styled(AddPlayer)`
  grid-area: add_player;
`;

const StyleLayoutItemRegisterWristband = styled(RegisterWristband)`
  grid-area: register_wristband;
width: 90%;
margin: 0 auto;
`;

function RouteRoster() {
  return (
    <StyleLayoutRoutePlayers>
      <StyleLayoutItemAddPlayer />
      <StyleLayoutItemRegisterWristband />
    </StyleLayoutRoutePlayers>
  );
}

export { RouteRoster };
