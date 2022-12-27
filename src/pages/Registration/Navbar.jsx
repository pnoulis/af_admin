import React from 'react';
import {ReactComponent as AddPlayerIcon } from '/src/assets/add_player.svg';
import {ReactComponent as MergeTeamIcon } from '/src/assets/merge_team.svg';
import {ReactComponent as PackageIcon } from '/src/assets/package.svg';
import {ReactComponent as SummaryIcon } from '/src/assets/summary.svg';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {HeaderItem} from '/src/components/Common';

const ConNav = styled.nav`
height: 100%;
display: flex;
flex-flow: row wrap;
justify-content: flex-start;
align-items: center;
gap: 10px;
`;

export default function Navbar() {
  return (
    <ConNav>
      <HeaderItem to='team/player/add' Img={AddPlayerIcon} content='add player'/>
      <HeaderItem to='team/create' Img={MergeTeamIcon} content='merge team'/>
      <HeaderItem to='team/package/edit' Img={PackageIcon} content='add player'/>
      <HeaderItem to='team/package/create' Img={SummaryIcon} content='add player'/>
    </ConNav>
  );
}
