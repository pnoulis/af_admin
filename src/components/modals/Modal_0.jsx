import React, { useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

const DialogStyled = styled.dialog`
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  top: 10%;
  bottom: 0;
  margin: auto;
  width: max-content;
`;

export function Modal_0({ open, onClose, children, ...props }) {
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
    <DialogStyled
      ref={modalRef}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClick}
    >
      {children}
    </DialogStyled>
  );
}
