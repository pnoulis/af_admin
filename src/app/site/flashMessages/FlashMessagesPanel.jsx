import styled from "styled-components";
import * as React from "react";

const StyleFlashMessagesPanel = styled("ul")`
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  bottom: 0;
  left: 0;
  height: max-content;
  width: 100vw;
  z-index: 100;
  align-items: center;
  pointer-events: none;
  margin-bottom: 30px;
`;

const StyleFlashItem = styled.li`
  min-width: 500px;
`;

function FlashMessagesPanel({ flashMessages }) {
  return (
    <StyleFlashMessagesPanel hide={!flashMessages.length}>
      {flashMessages.map((fm, i) => (
        <StyleFlashItem key={i}>{fm()}</StyleFlashItem>
      ))}
    </StyleFlashMessagesPanel>
  );
}

export default FlashMessagesPanel;
