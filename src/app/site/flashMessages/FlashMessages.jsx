import * as React from "react";
import { FlashMessagesStore } from "/src/stores";
import FlashMessagesPanel from "./FlashMessagesPanel";

function FlashMessages({ children }) {
  const [flashMessages, setFlashMessages] = FlashMessagesStore.init();
  return (
    <>
      <FlashMessagesStore.Provide value={{ flashMessages, setFlashMessages }}>
        {children}
        <FlashMessagesPanel flashMessages={flashMessages} />
      </FlashMessagesStore.Provide>
    </>
  );
}

export { FlashMessages };
