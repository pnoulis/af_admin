import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {
  StyleLayoutPanel,
  StyleLayoutPanelItemMain,
} from '/src/components/styled/panels';
import { TeamsPanelHeader } from './TeamsPanelHeader.jsx';
import { TeamsProvider } from './store';

function RouteTeams() {
  return (
    <TeamsProvider>
      <StyleLayoutPanel>
        <TeamsPanelHeader/>
        <StyleLayoutPanelItemMain>
          <Outlet/>
        </StyleLayoutPanelItemMain>
      </StyleLayoutPanel>
    </TeamsProvider>
  );
}

export { RouteTeams };
