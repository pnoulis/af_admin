import React from 'react';
import styled from 'styled-components';
import { PanelLink } from '/src/components/links';
import { ReactComponent as AddPlayerIcon } from '/assets/icons/add_player.svg';
import { ReactComponent as CreateTeamIcon } from '/assets/icons/merge_team.svg';
import { ReactComponent as addPackageIcon } from '/assets/icons/add_package.svg';
import { ReactComponent as SubmitTeamIcon } from '/assets/icons/summary.svg';


const PanelHeader = styled.header`
all: unset;
box-sizing: border-box;
display: grid;

// Dimensions
min-width: 100%;

// Contents
grid-template-rows: minmax(130px, min-content);
grid-template-columns: 1fr 1fr;
grid-template-areas: "Nav Toolbar";
justify-content: center;
align-items: center;


& > .header--nav {
display: flex;
gap: 10px;
}

`;

export function Header() {
  return (
    <PanelHeader className='panel--header'>
      <nav className='header--nav'>
        <PanelLink
          to='team/player/add'
          Icon={AddPlayerIcon}
        >
          add player
        </PanelLink>
        <PanelLink
          to='team/create'
          Icon={CreateTeamIcon}
        >
          create team
        </PanelLink>
        <PanelLink
          to='team/package/add'
          Icon={addPackageIcon}
        >
          package
        </PanelLink>
        <PanelLink
          to='team/package/submit'
          Icon={SubmitTeamIcon}
        >
          submit
        </PanelLink>
      </nav>
      <section className='header--toolbar'>
      </section>
    </PanelHeader>
  );
}
