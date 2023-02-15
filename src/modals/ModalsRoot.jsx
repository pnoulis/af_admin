import * as React from "react";
import { Modal } from "./Modal";

function ModalsRoot({ root }) {
  React.useEffect(() => {
    Modal.mountPoint = root;
  }, []);

  return <React.Fragment></React.Fragment>;
}

export { ModalsRoot };
