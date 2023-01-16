import React, { useCallback, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Cancel } from "/assets/icons/cancel_1-cropped.svg";

const DialogStyled = styled.dialog`
  background-color: white;
  padding: 20px;
  border-radius: var(--border-radius-2);
  border: 4px solid var(--primary-medium);
  position: relative;
  width: max-content;
  height: max-content;

  .modal-close-icon {
    box-sizing: content-box;
    padding: 5px;
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    fill: var(--primary-medium);
    stroke-width: 1.5;
    stroke: white;
    cursor: pointer;
  }
`;

const StyleReplacedDialog = styled(DialogStyled)`
  position: absolute;
  top: 0;
  left: 0;
`;

const StylePositionedDialog = styled(DialogStyled).attrs((props) => {
  switch (props.position) {
    case "bottom left":
      props.left = 0;
      props.bottom = 0;
      props.translate = "translate(-100%, 100%)";
      break;
    case "bottom center":
      props.left = "50%";
      props.bottom = 0;
      props.translate = "translate(-50%, 100%)";
      break;
    case "bottom right":
      props.right = 0;
      props.bottom = 0;
      props.translate = "translate(100%, 100%)";
      break;
    case "top left":
      props.top = 0;
      props.left = 0;
      props.translate = "translate(-100%, -100%)";
      break;
    case "top center":
      props.top = 0;
      props.left = "50%";
      props.translate = "translate(-50%, -100%)";
      break;
    case "top right":
      props.top = 0;
      props.right = 0;
      props.translate = "translate(100%, -100%)";
      break;
    default:
      break;
  }
  return props;
})`
  background-color: red;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  transform: ${(props) => props.translate};
`;

const StyleFakeModal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: var(--border-radius-2);
  border: 4px solid var(--primary-medium);
  position: relative;

  .modal-close-icon {
    box-sizing: content-box;
    padding: 5px;
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    fill: var(--primary-medium);
    stroke-width: 1.5;
    stroke: white;
    cursor: pointer;
  }
`;

function Modal_0({ open, onClose, children }) {
  const modalRef = useRef(null);

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const onClick = useCallback(
    ({ target }) => {
      const { current: el } = modalRef;
      if (target === el) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
    }
    return () => modalRef.current?.close();
  });

  return (
    <StyleReplacedDialog>
      {children}
      <span className="modal-close-icon">
        <Cancel />
      </span>
    </StyleReplacedDialog>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  padding: 20px;

  & > div {
    min-height: 200px;
    width: 300px;
  }

  h1 {
    padding: 5px 10px;
    text-decoration: underline;
    font-size: 1.3rem;
    margin-bottom: 5px;
    color: white;
  }

  form {
    background-color: white;
  }
`;

function FakeModal({ open, position, children }) {
  const modalRef = useRef(null);
  const handleClose = useCallback(
    (e) => {
      modalRef.current?.close();
    },
    [modalRef.current]
  );

  useEffect(() => {
    if (open) {
      console.log("should open");
      modalRef.current.show();
    }
    return () => modalRef.current.close();
  }, [open]);

  return (
    <StylePositionedDialog ref={modalRef} position="top center">
      {children}
      <span className="modal-close-icon" onClick={handleClose}>
        <Cancel />
      </span>
    </StylePositionedDialog>
  );
}

function Modal({ open, position, children }) {}

export function displayModal_0() {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <div style={{ position: "relative", background: "yellow" }}>
        <p
          style={{ position: "relative" }}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          click me
        </p>
        <FakeModal open={open}>
          <p>one</p>
          <p>one</p>
          <p>one</p>
          <p>one</p>
        </FakeModal>
      </div>
    </Container>
  );
}
