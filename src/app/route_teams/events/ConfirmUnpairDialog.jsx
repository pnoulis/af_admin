import { Dialog } from "/src/components/dialogs";
import styled from "styled-components";
import * as React from "react";
import { ReactComponent as CloseIcon } from "/assets/icons/cancel_1.svg";
import { Svg } from "/src/components/svgs";
import { createRipple } from "/src/lib";

const ButtonStyled = styled("button")`
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
    opacity: 0.8;
  }

  &:disabled {
    opacity: 50%;
  }
`;

export function ButtonTextBasic({ children, ...props }) {
  return (
    <ButtonStyled onClick={createRipple} {...props}>
      {children}
    </ButtonStyled>
  );
}

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
  height: 160px;
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

function ConfirmUnpairDialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onUnpair,
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
        <DialogTitle>Unpair wristband?</DialogTitle>
        <DialogButtons>
          <ButtonTextBasic
            onClick={() => {
              onUnpair();
              setOpen(false);
            }}
          >
            unpair
          </ButtonTextBasic>
          <ButtonTextBasic onClick={() => setOpen(false)}>
            cancel
          </ButtonTextBasic>
        </DialogButtons>
      </MyDialog>
    </StyleBasicDialog>
  );
}

export { ConfirmUnpairDialog };
