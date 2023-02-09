import * as React from "react";
import { FlashMessageBase } from "./FlashMessageBase";
import styled from "styled-components";
import { ReactComponent as InfoIcon } from "/assets/icons/info-outlined.svg";
import { Svg } from "/src/components/svgs";

const StyleLayoutFmBase = styled(FlashMessageBase)`
  padding: 10px 20px;
  min-width: 350px;
  border-radius: var(--border-radius-0);
  font-size: var(--text-md);
  letter-spacing: 1px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
  gap: 20px;
  box-shadow: 2px 8px 50px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);

  background-color: ${({ variant }) => {
    switch (variant) {
      case "info":
        return "var(--info)";
      case "success":
        return "var(--success - strong)";
      case "warning":
        return "var(--warn)";
      case "error":
        return "var(--error-2)";
      default:
        return "black";
    }
  }};
`;

const StyleLayoutFmItemIcon = styled.section`
  flex: 0 0 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyleLayoutFmItemMessage = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function FlashMessageInfo({ message, ...props }) {
  return (
    <StyleLayoutFmBase variant="info" {...props}>
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <InfoIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFmBase>
  );
}

function FlashMessageSuccess({ message, ...props }) {
  return (
    <StyleLayoutFmBase variant="success" {...props}>
      <StyleLayoutFmItemIcon></StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFmBase>
  );
}

function FlashMessageWarning({ message, ...props }) {
  return (
    <StyleLayoutFmBase variant="warning" {...props}>
      <StyleLayoutFmItemIcon></StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFmBase>
  );
}

function FlashMessageError({ message, ...props }) {
  return (
    <StyleLayoutFmBase variant="error" {...props}>
      <StyleLayoutFmItemIcon></StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFmBase>
  );
}

function FlashMessageCustom({ children, ...props }) {
  return <FlashMessageBase {...props}>{children}</FlashMessageBase>;
}

export {
  FlashMessageInfo,
  FlashMessageSuccess,
  FlashMessageWarning,
  FlashMessageError,
  FlashMessageCustom,
};
