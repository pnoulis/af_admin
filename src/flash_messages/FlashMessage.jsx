import * as React from "react";
import * as ReactClient from "react-dom/client";
import { ReactComponent as InfoIcon } from "/assets/icons/info-outlined.svg";
import { ReactComponent as ErrorIcon } from "/assets/icons/error-outlined.svg";
import { ReactComponent as WarningIcon } from "/assets/icons/warning-outlined.svg";
import { ReactComponent as SuccessIcon } from "/assets/icons/task-success-outlined.svg";
import { Svg } from "/src/components/svgs";
import {
  StyleLayoutFlashMessage,
  StyleLayoutFmItemIcon,
  StyleLayoutFmItemMessage,
} from "./styles";

function FlashMessage() {}

FlashMessage.prototype.render = function render(fmRoot, fmContent) {
  if (!this.mountPoint) {
    throw new Error("<FlashMessageRoot/> has not mounted");
  }
  if (!this.setFm) {
    throw new Error("Missing flashMessage setter!");
  }

  this.mountPoint.appendChild(fmRoot);
  ReactClient.createRoot(fmRoot).render(fmContent);
  this.setFm({ timeout: fmRoot.getAttribute("data-timeout") });
};

FlashMessage.prototype.createRoot = function create({ timeout = 5000 } = {}) {
  timeout = Date.now() + timeout;
  const fmRoot = document.createElement("article");
  fmRoot.setAttribute("class", "flash-message");
  fmRoot.setAttribute("data-timeout", timeout);
  return fmRoot;
};

FlashMessage.prototype.info = function info(message, options) {
  const fmRoot = this.createRoot(options);
  this.render(
    fmRoot,
    <StyleLayoutFlashMessage variant="info">
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <InfoIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFlashMessage>
  );
};
FlashMessage.prototype.warn = function warn(message = "", options) {
  const fmRoot = this.createRoot(options);
  this.render(
    fmRoot,
    <StyleLayoutFmBase variant="warning" {...props}>
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <WarningIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFmBase>
  );
};
FlashMessage.prototype.error = function error(message = "", options) {
  const fmRoot = this.createRoot(options);
  this.render(
    fmRoot,
    <StyleLayoutFmBase variant="error" {...props}>
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <ErrorIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFmBase>
  );
};
FlashMessage.prototype.success = function success(message = "", options) {
  const fmRoot = this.createRoot(options);
  this.render(
    fmRoot,
    <StyleLayoutFmBase variant="success" {...props}>
      <StyleLayoutFmItemIcon>
        <Svg color="white">
          <SuccessIcon />
        </Svg>
      </StyleLayoutFmItemIcon>
      <StyleLayoutFmItemMessage>{message}</StyleLayoutFmItemMessage>
    </StyleLayoutFmBase>
  );
};
FlashMessage.prototype.custom = function custom(customFm, options) {
  if (!React.isValidElement(customFm)) {
    throw new Error("Custom Flash Message is not a valid React Element");
  }

  const fmRoot = this.createRoot(options);
  this.render(
    fmRoot,
    <StyleLayoutFlashMessage>{customFm}</StyleLayoutFlashMessage>
  );
};

const flashMessage = new FlashMessage();

export { flashMessage as FlashMessage };
