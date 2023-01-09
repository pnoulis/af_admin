import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import styled from 'styled-components';

function createRipple(event) {
  const button = event.currentTarget;
  const btnRect = button.getBoundingClientRect();
  const circle = document.createElement("span");
  const diameter = Math.max(btnRect.width, btnRect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
  circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const Circle = styled('span')`
backgroud-color: green;
width: 50px;
height: 50px;
`;

const Button = styled('button')`
// defaults
all: unset;
display: revert;
box-sizing: border-box;

// content
font-family: 'Roboto';
font-size: var(--text-md);
text-transform: uppercase;
letter-spacing: 1px;
word-spacing: 3px;
text-align: center;
line-height: 0;
color: var(--text-on-dark-basic);

// dimensions
min-width: 120px;
padding: 0 1.5em;
aspect-ratio: 2.25 / 1;

// appearance
background-image: var(--btn-primary-color);
background-size: 200% auto;
border-radius: var(--border-radius-0);
cursor: pointer;
box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/

// dynamic
transition: .5s;

// position
position: relative;
overflow: hidden;

&:hover:not(:disabled) {
background-position: right center;
}

&:disabled {
opacity: 50%;
}

`;

export function Button_0() {
  return (
    <div>
      <Button onClick={createRipple}>
        login
      </Button>
    </div>
  );
}
