import React from "react";
import { createRipple } from "/src/lib";
import styled from "styled-components";

const ButtonStyled = styled("button")`
  // defaults
  all: unset;
  display: revert;
  box-sizing: border-box;

  // content
  font-family: "Roboto";
  font-size: var(--text-md);
  text-transform: uppercase;
  letter-spacing: 1px;
  word-spacing: 3px;
  text-align: center;
  line-height: 0;
  color: var(--text-on-dark-basic);

  // dimensions
  width: max-content;
  padding: 0 1.5em;
  height: 55px;

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

export function ButtonText({ children, ...props }) {
  return (
    <ButtonStyled onClick={createRipple} {...props}>
      {children}
    </ButtonStyled>
  );
}
