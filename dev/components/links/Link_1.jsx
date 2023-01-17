import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as AddPlayer } from '/assets/icons/add_player.svg';

const StyledLink = styled(NavLink)`
// defaults
all: unset;
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
gap: .4em;
box-sizing: border-box;


// content
font-family: 'Roboto';
font-size: var(--text-sm);
text-transform: uppercase;
letter-spacing: 0.2px;
word-spacing: 1px;
white-space: nowrap;

// dimensions
width: 110px;
height: 110px;
padding: 0.7em;

// appearance
cursor: pointer;
border-radius: var(--border-radius-1);
box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
color: var(--text-on-dark-basic);
fill: var(--text-on-dark-accent);
background-color: var(--link-icon-color);

.icon {
width: 80%;
height: 80%;
}

&:hover {
opacity: .8;
}

&:disabled {

}

&:active {
background-color: var(--link-icon-active-color);
}

`;


function LinkIcon({children, Icon, ...props}) {
  return (
    <StyledLink to='#'>
      <span className='icon'>
        <Icon/>
      </span>
      <span className='text'>
        {children}
      </span>
    </StyledLink>
  );
}

const ContainLinks = styled.div`
display: flex;
gap: 20px;
width: 200px;
`;


export function Links_1() {
  return (
    <React.Fragment>
      <ContainLinks>
        <LinkIcon to='/dropdowns' Icon={AddPlayer}>add player</LinkIcon>
      </ContainLinks>
    </React.Fragment>
  );
}
