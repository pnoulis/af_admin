import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const StyledLink = styled(NavLink)`
display: flex;
  align-items: center;
  width: 100%;
aspect-ratio: 3 / 1;
  cursor: pointer;
  color: var(--text-on-dark-basic);
  background: url('/side_bar.png');
  background-size: cover;
  background-position-y: 40%;
  border-radius: var(--border-radius-0);
  padding-left: 15%;
  outline: none;
  font-family: 'Roboto';
  font-size: var(--text-lg);
  font-weight: normal;
  text-transform: capitalize;
  text-decoration: none;
  letter-spacing: 2px;
word-spacing: 1px;
white-space: nowrap;

&:hover {
  opacity: .8;
}

&:active {
  background: var(--primary-base);
}

&:disabled {

}

`;


const ContainLinks = styled.div`
display: flex;
gap: 20px;
width: 200px;
`;

export function Links() {
  return (
    <React.Fragment>
      <ContainLinks>
        <StyledLink>hello</StyledLink>
      </ContainLinks>
    </React.Fragment>
  );
}
