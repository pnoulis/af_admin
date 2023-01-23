import * as React from "react";
import { FlashMessagesStore } from "/src/stores";
import styled from "styled-components";

const StyleFlashMessage = styled.article`
  padding: 12px 20px;
  border-radius: var(--border-radius-0);
  font-size: var(--text-lg);
  letter-spacing: 1px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
  column-gap: 30px;
  box-shadow: var(--card-basic-shadow);
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
