import Dialog from "./Dialog";
import styled from "styled-components";
import * as React from "react";
import { ReactComponent as CloseIcon } from "/assets/icons/cancel_1.svg";
import { Svg } from "/src/components/svgs";

const StyleBasicDialog = styled(Dialog)`
  all: unset;
  display: ${(props) => (props.open ? "flex" : "none")};
  box-sizing: border-box;
  z-index: 100;
  position: fixed;
  min-width: 200px;
  min-height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: var(--card-basic-shadow-2);
  background: var(--card-basic-color);
  border: none;
  padding: 20px;
  border-radius: var(--border-radius-2);
  flex-flow: column nowrap;

  &::backdrop {
    background: hsl(240, 64%, 80%);
    opacity: 0.2;
  }
`;

const StyleCloseDialogButton = styled(Svg)`
  box-sizing: content-box;
  padding: 5px;
  width: 35px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-40%) translateX(40%);
  cursor: pointer;
  fill: var(--primary-strong);
  border-radius: var(--border-radius-1);
`;

function BasicDialog({ open, onOpenChange, children, ...props }) {
  return (
    <StyleBasicDialog open={open} onOpenChange={onOpenChange} {...props}>
      <StyleCloseDialogButton onClick={() => onOpenChange(false)}>
        <CloseIcon />
      </StyleCloseDialogButton>
      {children}
    </StyleBasicDialog>
  );
}

export { BasicDialog };
