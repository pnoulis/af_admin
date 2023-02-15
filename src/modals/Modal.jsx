import ReactDOM from "react-dom";
import * as ReactClient from "react-dom/client";

function Modal() {}

Modal.prototype.render = function render(modal) {
  if (!this.mountPoint) {
    throw new Error("<ModalsRoot/> has not mounted");
  }

  const modalRoot = document.createElement("article");
  const reactroot = ReactClient.createRoot(modalRoot);
  this.mountPoint.appendChild(modalRoot);
  reactroot.render(modal);
};

const modal = new Modal();
export { modal as Modal };
