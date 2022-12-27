import React from 'react';
import { Outlet } from 'react-router-dom';

import {ReactComponent as AddPlayerIcon } from '/src/assets/add_player.svg';
import {ReactComponent as MergeTeamIcon } from '/src/assets/merge_team.svg';
import {ReactComponent as PackageIcon } from '/src/assets/package.svg';
import {ReactComponent as SummaryIcon } from '/src/assets/summary.svg';
import {HeaderItem, PanelHeader} from '/src/components/Common';

export default function Registration() {
    return (
        <React.Fragment>
          <PanelHeader>
            <HeaderItem redirect to='team/player/add' Img={AddPlayerIcon} content='add player'/>
            <HeaderItem to='team/create' Img={MergeTeamIcon} content='create team'/>
            <HeaderItem to='team/package/create' Img={PackageIcon} content='create package'/>
            <HeaderItem to='team/package/add' Img={SummaryIcon} content='submit'/>
          </PanelHeader>
          <section>
            <Outlet/>
          </section>
        </React.Fragment>
    );
}
