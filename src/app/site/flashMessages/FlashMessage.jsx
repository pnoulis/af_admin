import * as React from "react";
import { FlashMessagesStore } from "/src/stores";
import styled from "styled-components";

const StyleFlashMessage = styled.article`
  padding: 10px 20px;
min-width: 350px;
  border-radius: var(--border-radius-0);
  font-size: var(--text-md);
  letter-spacing: 1px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
box-shadow: 2px 8px 50px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);
`;

function FlashMessage({ className, message, timeout = 3000, id, children }) {
  const { setFlashMessages } = FlashMessagesStore.use();

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setFlashMessages((fms) => fms.filter((fm) => fm().props.id !== id));
    }, timeout);

    () => window.clearTimeout(timeoutId);
  }, [id]);

  return (
    <StyleFlashMessage className={className}>
      {message ? message : children}
    </StyleFlashMessage>
  );
}

export default FlashMessage;
