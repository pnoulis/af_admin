import Menu from "./Menu";
import MenuItem from "./MenuItem";
import styled from "styled-components";

const StyleMenu = styled(Menu)`
  display: block;
  background-color: green;
  width: 80px;
  cursor: pointer;
  text-align: center;
  padding: 5px 0;
  margin-left: 50px;

  &:menu {
    border-radius: var(--border-radius-1);
    background-color: yellow;
  }
`;

const StyleMenuItem = styled(MenuItem)`
  display: block;
  width: 80px;
  cursor: pointer;

  &:focus {
    color: brown;
  }

  &:hover {
    opacity: 0.5;
  }
`;

function BasicMenu({ items, ...props }) {
  return (
    <StyleMenu label="yolo">
      <StyleMenuItem label="one">one</StyleMenuItem>
      <StyleMenuItem label="two">two</StyleMenuItem>
      <StyleMenuItem label="three">three</StyleMenuItem>
      <StyleMenuItem label="four">four</StyleMenuItem>
    </StyleMenu>
  );
}

export { BasicMenu };
