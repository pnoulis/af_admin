import { Dialog } from "/src/components/dialogs";
import styled from "styled-components";
import * as React from "react";
import { ButtonTextBasic } from "/src/components/buttons";
import { ReactComponent as CloseIcon } from "/assets/icons/cancel_1.svg";
import { Svg } from "/src/components/svgs";
import { NumberOfTeamsForm } from "./NumberOfTeamsForm";

const StyleBasicDialog = styled(Dialog)`
  all: unset;
  display: ${(props) => (props.open ? "flex" : "none")};
  box-sizing: border-box;
  z-index: 100;
  position: fixed;
  min-width: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // box-shadow: var(--card-basic-shadow-2);
  box-shadow: var(--panel-shadow);
  background: var(--card-basic-color);
  border: none;
  padding: 10px 15px;
  border-radius: var(--border-radius-2);
  flex-flow: column nowrap;

  &::backdrop {
    background: hsl(240, 64%, 80%);
    opacity: 0.4;
  }
`;
const StyleCloseDialogButton = styled(Svg)`
  box-sizing: content-box;
  padding: 5px;
  // width: 35px;
  // height: 35px;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-40%) translateX(40%);
  cursor: pointer;
  fill: var(--primary-strong);
  border-radius: var(--border-radius-1);
`;

const MyDialog = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 350px;
  height: 250px;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const DialogTitle = styled.p`
  font-family: NoirPro-Bold;
  text-align: center;
  // color: var(--primary-strong);
  font-size: var(--text-md);
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%;
  word-spacing: 3px;
`;

const DialogButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const StyleButton = styled(ButtonTextBasic)`
  height: 50px;
`;

function NewTeamsDialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onSubmit,
  ...props
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  return (
    <StyleBasicDialog open={open} onOpenChange={setOpen} {...props}>
      <StyleCloseDialogButton key={open} onClick={() => setOpen(false)}>
        <CloseIcon />
      </StyleCloseDialogButton>
      <MyDialog>
        <DialogTitle>create teams</DialogTitle>
        <NumberOfTeamsForm setOpen={setOpen} onSubmit={onSubmit} />
        <DialogButtons>
          <StyleButton
            onClick={() => {
              setOpen(false);
            }}
          >
            cancel
          </StyleButton>
          <StyleButton type="submit" form="createTeamsForm">
            create
          </StyleButton>
        </DialogButtons>
      </MyDialog>
    </StyleBasicDialog>
  );
}

export { NewTeamsDialog };
