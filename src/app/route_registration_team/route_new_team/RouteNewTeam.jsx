import * as React from "react";
import styled from "styled-components";
import { ButtonText } from "/src/components/buttons";

const StyleRouteNewTeam = styled.div`
  all: unset;
  /* Type */
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas: "generate_teams teams_list";
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

const StyleButtonText = styled(ButtonText)`
  height: 55px;
  padding: 0 2em;
`;

function GenerateTeamsButton() {
  return <StyleButtonText>generate teams</StyleButtonText>;
}

function Done() {
  return <StyleButtonText>done</StyleButtonText>;
}

function RouteNewTeam() {
  return (
    <StyleRouteNewTeam>
      <section>
        <GenerateTeamsButton />
        <Done />
      </section>
    </StyleRouteNewTeam>
  );
}

export { RouteNewTeam };
