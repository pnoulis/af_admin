import React, { useCallback, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
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
    case "left bottom":
      props.left = 0;
      props.bottom = 0;
      props.translate = "translate(-100%, 100%)";
      break;
    case "center bottom":
      props.left = "50%";
      props.bottom = 0;
      props.translate = "translate(-50%, 100%)";
      break;
    case "right bottom":
      props.right = 0;
      props.bottom = 0;
      props.translate = "translate(100%, 100%)";
      break;
    case "left top":
      props.top = 0;
      props.left = 0;
      props.translate = "translate(-100%, -100%)";
      break;
    case "center top":
      props.top = 0;
      props.left = "50%";
      props.translate = "translate(-50%, -100%)";
      break;
    case "right top":
      props.top = 0;
      props.right = 0;
      props.translate = "translate(100%, -100%)";
      break;
    case "replace":
      props.top = 0;
      props.left = 0;
      props.width = "100%";
      props.height = "100%";
      break;
    case "center":
      props.top = "50%";
      props.left = "50%";
      props.translate = "translate(-50%, -50%)";
    default:
      const [top, right, bottom, left, translate] = props.position.split(" ");
      props.top = top;
      props.right = right;
      props.bottom = bottom;
      props.left = left;
      props.translate = translate;
      break;
  }
  return props;
})`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  transform: ${(props) => props.translate};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const StyleFakeModal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: var(--border-radius-2);
  border: 4px solid var(--primary-medium);
  position: absolute;

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

function FakeModal({ open, onClose, block, position, children }) {
  const modalRef = useRef(null);

  const handleClose = useCallback(
    (e) => {
      modalRef.current?.close();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      if (block) {
        modalRef?.current.showModal();
      } else {
        modalRef?.current.show();
      }
    }
    return () => modalRef?.current.close();
  }, [open]);

  return (
    <StylePositionedDialog
      ref={modalRef}
      onClose={onClose}
      position="50px 100px"
    >
      {children}
      <span className="modal-close-icon" onClick={handleClose}>
        <Cancel />
      </span>
    </StylePositionedDialog>
  );
}

export function displayModal_0() {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <div style={{ position: "relative", background: "yellow" }}>
        <p
          style={{ position: "relative" }}
          onClick={(e) => {
            console.log("being clicked");

            setOpen((prev) => !prev);
          }}
        >
          click me
        </p>
        <FakeModal
          open={open}
          onClose={() => {
            console.log("closing");
            setOpen(false);
          }}
        >
          <p>one</p>
          <p>one</p>
          <p>one</p>
          <p>one</p>
        </FakeModal>
      </div>
    </Container>
  );
}
