import styled from "styled-components";

const StyleToolbar = styled.div`
  height: 10%;
  background-color: green;
  color: black;
`;

const StyleSidebarScrollable = styled.div`
  max-height: 90%;
  background-color: pink;
  display: flex;
  gap: 10px;
  padding: 10px;
  flex-flow: column nowrap;
  overflow: scroll;
`;

const StyleSidebar = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  background-color: red;
`;

const StyleFakeItem = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: yellow;
`;

export { StyleSidebar, StyleFakeItem, StyleSidebarScrollable, StyleToolbar };
