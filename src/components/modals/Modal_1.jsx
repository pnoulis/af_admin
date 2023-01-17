import React, { useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

const StyleDialogBase = styled("dialog").attrs((props) => {
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

function Modal_1({ open, onClose, block, position, children }) {
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
        modalRef.current?.showModal();
      } else {
        modalRef.current?.show();
      }
    } else {
      modalRef.current?.close();
    }
    return () => modalRef.current?.close();
  }, [open]);

  return (
    <StyleDialogBase ref={modalRef} position={position}>
      {children}
    </StyleDialogBase>
  );
}

export { Modal_1 };
