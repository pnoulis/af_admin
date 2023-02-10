import React from 'react';
import {createRipple} from '/src/lib';
import styled from 'styled-components';

const ButtonStyled = styled('button')`
// defaults
all: unset;
display: revert;
box-sizing: border-box;

// content
// font-family: 'Roboto';
  font-family: NoirPro-Medium;
font-size: var(--text-md);
text-transform: uppercase;
letter-spacing: 1px;
word-spacing: 3px;
text-align: center;
line-height: 0;
color: var(--text-on-dark-basic);

// dimensions
min-width: 120px;
height: 40px;
padding: 0 1.5em;

// appearance
border-radius: var(--border-radius-0);
cursor: pointer;
box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/
background-color: var(--primary-strong);

// position
position: relative;
overflow: hidden;

&:hover:not(:disabled) {
background-position: right center;
}

&:hover {
opacity: .8;
}

&:disabled {
opacity: 50%;
}

`;

export function ButtonTextBasic({children, ...props}) {
  return (
    <ButtonStyled onClick={createRipple} {...props}>
      {children}
    </ButtonStyled>
  );
}
