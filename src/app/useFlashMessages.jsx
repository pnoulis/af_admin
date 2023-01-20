import * as React from "react";
import * as ReactDOM from "react-dom";

function useFlashMessages() {
  return (type, message, timeout) => {
    const dont = document.getElementById("flash-messages");
    switch (type) {
      default:
        if (!type) return;
        if (React.isValidElement(type)) {
          dont.append("otehunotehu");
        } else {
          throw new Error(`${type} is not a valid React Element`);
        }
    }
  };
}

export { useFlashMessages };
export default useFlashMessages;
