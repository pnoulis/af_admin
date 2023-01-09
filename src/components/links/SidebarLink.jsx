import React from 'react';
import styled from 'styled-components';
import { createRipple } from '/src/lib';
import { NavLink } from 'react-router-dom';

const SidebarLinkStyle = styled(NavLink)`
all: unset;
display: flex;
box-sizing: border-box;

// Dimensions
width: 100%;
aspect-ratio: 3 / 1;
// Contents
align-items: center;
font-size: var(--text-lg);
font-weight: bolder;
text-transform: capitalize;
letter-spacing: 2px;
word-spacing: 1px;
white-space: nowrap;
// Appearance
cursor: pointer;
color: var(--text-on-dark-basic);
padding-left: 15%;
border-radius: var(--border-radius-0);
// Position
position: relative;
overflow: hidden;

&:hover {
opacity: .6;
}

&.active {
background: var(--primary-base);
}

`;

function SidebarLink({children, to, ...props}) {
  return (
    <SidebarLinkStyle to={to} {...props} onClick={createRipple}>
      {children}
    </SidebarLinkStyle>
  );
}

export { SidebarLink };
