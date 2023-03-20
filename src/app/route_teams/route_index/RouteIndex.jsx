import * as React from 'react';
import styled from 'styled-components';
import { TableTeams } from './TableTeams.jsx';
import {
  useTeamsContext,
} from '../store.jsx';
import { TeamsToolbar } from './TeamsToolbar';

const StyleLayoutRouteTeamsIndex = styled.div`
  all: unset;
  /* Type */
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  margin: auto;
  gap: 40px;
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



function RouteIndex() {
  const { state, dispatch } = useTeamsContext();

  return (
    <StyleLayoutRouteTeamsIndex>
      <TeamsToolbar />
      <TableTeams rows={state.filter || state.teams} />
    </StyleLayoutRouteTeamsIndex>
  );
}

export { RouteIndex };
