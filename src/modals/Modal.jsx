import * as ReactClient from "react-dom/client";

function Modal() {}

Modal.prototype.render = function render(modal) {
  if (!this.mountPoint) {
    throw new Error("<ModalsRoot/> has not mounted");
  }

  this.mountPoint.render(modal);
  // ReactClient.createRoot(this.mountPoint).render(modal);
};

const modal = new Modal();
export { modal as Modal };
