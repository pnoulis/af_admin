import * as React from "react";
import styled from "styled-components";
import { createRipple } from "/src/lib";
import { NavLink } from "react-router-dom";

const StyleFancyLink = styled(NavLink)`
  // defaults
  all: unset;
  display: flex;
  box-sizing: border-box;
  background-color: red;

  font-family: "Roboto";
  font-size: var(--text-md);
  text-transform: uppercase;
  letter-spacing: 1px;
  word-spacing: 3px;
  color: var(--text-on-dark-basic);
  align-items: center;
  justify-content: center;

  // dimensions
  min-width: 120px;
  width: max-content;
  padding: 0 1.5em;
  aspect-ratio: 2.25 / 0.8;

  // appearance
  background-image: var(--btn-primary-color);
  background-size: 200% auto;
  border-radius: var(--border-radius-0);
  cursor: pointer;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3); /*black with 30% opacity*/

  // dynamic
  transition: 0.5s;

  // position
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background-position: right center;
  }

  &:disabled {
    opacity: 50%;
    cursor: default;
  }
`;

function FancyLinkButton({ path, label, ...props }) {
  return (
    <StyleFancyLink to={path} end onClick={createRipple} {...props}>
      {label}
    </StyleFancyLink>
  );
}

export { FancyLinkButton };
