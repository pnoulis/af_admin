import * as React from "react";
import ReactDOM from "react-dom/client";

function SomeComp() {
  return <p>yolo</p>;
}
function FlashMessage() {
  return this;
}

FlashMessage.prototype.render = function render(customFm, options) {
  if (!this.root) {
    throw new Error("Missing <FlashMessageRoot/> node");
  }

  options.timeout = Date.now() + options.timeout || 3000;
  const fmRootNode = document.createElement("article");
  fmRootNode.classList.add("flash-message");
  fmRootNode.setAttribute("data-timeout", options.timeout);
  this.root.appendChild(fmRootNode);
  const fm = this.create(customFm, options);
  ReactDOM.createRoot(fmRootNode).render(fm);
  this.set(options.timeout);
};

FlashMessage.prototype.create = function create(customFm, options) {
  return <SomeComp />;
};

FlashMessage.prototype.set = function set(timeout) {
  if (!this.setter) {
    throw new Error("Missing flashMessage setter!");
  }
  this.setter({ timeout });
};

const flashMessage = new FlashMessage();
function setupFlashMessage(setter, root) {
  flashMessage.setter = setter;
  flashMessage.root = root;
}

export { setupFlashMessage, flashMessage };
