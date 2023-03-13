import * as React from "react";
import { TableTeams } from "./TableTeams.jsx";
import { TeamsToolbar } from "./TeamsToolbar";
import styled from "styled-components";
import {
  useRegistrationContext,
  RegistrationProvider,
} from "/src/app/route_registration_team";

const StyleLayoutRouteTeamsIndex = styled.div`
  all: unset;
  /* Type */
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  margin: auto;
  /* Dimensions */
  width: 100%;
  height: 100%;
  max-width: 80%;
  padding: 50px;
  /* Position */
  /* Fonts */
  /* Effects */
  /* Children */
`;

const createData = (name, nplayers, npackages, status) => ({
  name,
  nplayers,
  npackages,
  status,
});

const teams = [
  createData("team_name#1", 6, 1, "playing"),
  createData("team_name#2", 6, 1, "playing"),
  createData("team_name#3", 6, 1, "playing"),
  createData("team_name#4", 6, 1, "playing"),
];

function RouteIndex() {
  const { state, dispatchRegistration } = useRegistrationContext();

  React.useEffect(() => {
    dispatchRegistration({ type: "set_teams", teams });
  }, []);

  React.useEffect(() => {
    console.log(state);
  }, [state.teams]);

  return (
    <StyleLayoutRouteTeamsIndex>
      <TeamsToolbar />
      <TableTeams rows={state.teams} />
    </StyleLayoutRouteTeamsIndex>
  );
}

export { RouteIndex };
