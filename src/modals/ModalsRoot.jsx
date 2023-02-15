import * as React from "react";
import { Modal } from "./Modal";

function ModalsRoot({ root }) {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    Modal.mountPoint = rootRef.current;
  }, []);

  return <div ref={rootRef}></div>;
}

export { ModalsRoot };
