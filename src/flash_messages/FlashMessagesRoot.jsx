import * as React from "react";
import styled from "styled-components";
import { FlashMessage } from "./FlashMessage";

const StyleLayoutFlashMessagesRoot = styled.div`
  position: fixed;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 20px;
  width: 100%;
  bottom: 0;
  margin-bottom: 30px;
`;

function FlashMessagesRoot() {
  const [flashMessages, setFlashMessages] = React.useState([]);
  const rootRef = React.useRef(null);
  const fmsRef = React.useRef([]);

  React.useEffect(() => {
    FlashMessage.mountPoint = rootRef.current;
    FlashMessage.setFm = (fm) => setFlashMessages((prev) => [...prev, fm]);
  }, []);

  React.useEffect(() => {
    for (let i = 0; i < rootRef.current.children.length; i++) {
      fmsRef.current[i] = rootRef.current.children[i];
    }

    let event = null;
    if (flashMessages.length) {
      event = window.setInterval(() => {
        const now = Date.now();
        setFlashMessages(
          flashMessages.reduce((car, cdr, i) => {
            if (now > cdr.timeout) {
              fmsRef.current[i].remove();
            } else {
              car.push(cdr);
            }
            return car;
          }, [])
        );
      }, 1000);
    }

    return () => event && window.clearInterval(event);
  }, [flashMessages, setFlashMessages]);

  return <StyleLayoutFlashMessagesRoot ref={rootRef} />;
}

export { FlashMessagesRoot };
