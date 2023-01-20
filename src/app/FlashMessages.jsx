import styled from "styled-components";

const FlashMessages = styled("aside")`
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100vw;
  background-color: black;
  z-index: 100;
`;

export { FlashMessages };
export default FlashMessages;
