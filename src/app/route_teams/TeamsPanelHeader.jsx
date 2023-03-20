import * as React from 'react';
import {
  StyleLayoutPanelItemHeader,
  PanelHeaderNavbar,
  PanelHeaderNavbarItem,
} from "/src/components/styled/panels";
// import { linkIndex } from "./route_index";
// import { linkPlayers } from "./route_players";
// import { linkPackage } from "./route_package";
// import { linkSummary } from "./route_summary";
import { ReactComponent as AddPlayerIcon } from "/assets/icons/add_player.svg";
import { ReactComponent as AddPackageIcon } from "/assets/icons/add_package.svg";
import { ReactComponent as SubmitTeamIcon } from "/assets/icons/summary.svg";
import { ReactComponent as CreateTeam } from "/assets/icons/merge_team-cropped.svg";
import { ReactComponent as PriceTeamIcon } from "/assets/icons/euro-cropped.svg";
import { TeamWidget } from './team_widget';
import { useTeamsContext } from './store';

function TeamsPanelHeader() {
  const { state, dispatch } = useTeamsContext();
  return (
    <StyleLayoutPanelItemHeader>
      <PanelHeaderNavbar>
        <PanelHeaderNavbarItem
          path={'/teams'}
          label="teams"
          renderIcon={<AddPackageIcon />}
        />
        <PanelHeaderNavbarItem
          /* {...linkPlayers} */
          path={`/teams/${state.active.id}/roster`}
          label="roster"
          renderIcon={<AddPlayerIcon />}
        />
        <PanelHeaderNavbarItem
          /* {...linkPackage} */
          path={`/teams/${state.active.id}/packages`}
          label="packages"
          renderIcon={<PriceTeamIcon />}
        />
        <PanelHeaderNavbarItem
          /* {...linkSummary} */
          path={`/teams/${state.active.id}/summary`}
          label='summary'
          renderIcon={<SubmitTeamIcon />}
        />
      </PanelHeaderNavbar>
      <TeamWidget/>
    </StyleLayoutPanelItemHeader>
  );
}

export { TeamsPanelHeader };
