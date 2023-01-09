import React from 'react';
import styled from 'styled-components';
import { createRipple } from '/src/lib';
import { NavLink } from 'react-router-dom';

const PanelLinkStyle = styled(NavLink)`
all: unset;
display: flex;
box-sizing: border-box;

// Dimensions
width: 110px;
height: 110px;
// Contents
flex-flow: column nowrap;
justify-content: center;
align-items: center;
font-size: var(--text-sm);
text-transform: uppercase;
letter-spacing: 0.2px;
word-spacing: 1px;
white-space: nowrap;
gap: .4em;
// Appearance
padding: 0.7em;
cursor: pointer;
border-radius: var(--border-radius-1);
box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
color: var(--text-on-dark-basic);
fill: var(--text-on-dark-accent);
background-color: var(--link-icon-color);
// Position
position: relative;
overflow: hidden;

.icon {
width: 80%;
height: 80%;
display: flex;
justify-content: center;
align-items: center;
}

&:hover {
opacity: .8;
}

&.active {
background-color: var(--link-icon-active-color);
}
`;

export function PanelLink({children, to, Icon, ...props}) {
  return (
    <PanelLinkStyle to={to} onClick={createRipple} {...props}>
      <span className='icon'>
        {Icon && <Icon/>}
      </span>
      <span className='text'>
        {children}
      </span>
    </PanelLinkStyle>
  );
}
