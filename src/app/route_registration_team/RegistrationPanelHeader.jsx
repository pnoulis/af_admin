import * as React from "react";
import {
  StyleLayoutPanelItemHeader,
  PanelHeaderNavbar,
  PanelHeaderNavbarItem,
} from "/src/components/styled/panels";
import { linkIndex } from "./route_index";
import { linkPlayers } from "./route_players";
import { linkMerge } from "./route_merge";
import { linkPackage } from "./route_package";
import { linkSummary } from "./route_summary";
import { ReactComponent as AddPlayerIcon } from "/assets/icons/add_player.svg";
import { ReactComponent as AddPackageIcon } from "/assets/icons/add_package.svg";
import { ReactComponent as SubmitTeamIcon } from "/assets/icons/summary.svg";
import { ReactComponent as CreateTeam } from "/assets/icons/merge_team-cropped.svg";
import { ReactComponent as PriceTeamIcon } from "/assets/icons/euro-cropped.svg";

function RegistrationPanelHeader() {
  return (
    <StyleLayoutPanelItemHeader>
      <PanelHeaderNavbar>
        <PanelHeaderNavbarItem
          path={linkIndex.path}
          label="teams"
          renderIcon={<AddPackageIcon />}
        />
        <PanelHeaderNavbarItem
          {...linkPlayers}
          renderIcon={<AddPlayerIcon />}
        />
        <PanelHeaderNavbarItem {...linkMerge} renderIcon={<CreateTeam />} />
        <PanelHeaderNavbarItem
          {...linkPackage}
          renderIcon={<PriceTeamIcon />}
        />
        <PanelHeaderNavbarItem
          {...linkSummary}
          renderIcon={<SubmitTeamIcon />}
        />
      </PanelHeaderNavbar>
    </StyleLayoutPanelItemHeader>
  );
}

export { RegistrationPanelHeader };
