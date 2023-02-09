import * as ReactDOM from "react-dom";

function FlashMessagePortal({ children }) {
  const root = document.getElementById("flash-message-portal");
  if (!root) {
    throw new Error("Flash messages portal DOM root Node could not be found");
  }
  return children ? ReactDOM.createPortal(children, root) : null;
}

export { FlashMessagePortal };
