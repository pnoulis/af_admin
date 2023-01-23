import * as React from "react";
import { useFl } from "/src/hooks";
import { Menu, MenuItem } from "/src/components/menus";
import styled from "styled-components";
import {
  useInteractions,
  useFloating,
  useListNavigation,
  FloatingFocusManager,
} from "@floating-ui/react";

const MyButton = styled(MenuItem)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  text-align: left;
  line-height: 1.8;
  min-width: 110px;
  margin: 0;
  outline: 0;

  &:focus {
    background: royalblue;
  }
`;

const ListItem = styled("span")`
  &:hover {
    background-color: green;
  }

  &:focus {
    background-color: red;
  }
`;
const One = styled("p")`
  &:hover {
    background-color: green;
  }

  &:focus {
    background-color: red;
  }
`;

function SomeList() {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const { x, y, strategy, refs, context } = useFloating({
    open: true,
  });

  const listRef = React.useRef([]);

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    virtual: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNavigation]
  );

  const items = ["one", "two", "three"];

  return (
    <React.Fragment>
      <div ref={refs.setReference} {...getReferenceProps()}>
        reference elemen
      </div>
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
        {...getFloatingProps()}
      >
        {items.map((item, i) => (
          <One
            key={item}
            id={`some-list-${i}`}
            role="option"
            tabIndex={activeIndex === i ? 0 : -1}
            ref={(node) => {
              listRef.current[i] = node;
            }}
            {...getItemProps}
          >
            {item}
          </One>
        ))}
      </div>
    </React.Fragment>
  );
}

function Test() {
  return (
    <React.Fragment>
      <p>iam testing</p>
      <Menu label="edit">
        <MyButton label="undo" />
        <MyButton label="edit" />
        <MyButton label="delete" />
        <MyButton label="add" />
        <Menu label="copy as">
          <MyButton label="text" />
          <MyButton label="image" />
        </Menu>
      </Menu>

      <h1>Different tree</h1>
      <ul>
        <ListItem tabIndex="0">one</ListItem>
        <ListItem tabIndex="0">one</ListItem>
        <ListItem tabIndex="0">one</ListItem>
        <ListItem tabIndex="0">one</ListItem>
        <ListItem tabIndex="0">one</ListItem>
      </ul>
      <h2>Another list</h2>
      <SomeList />
    </React.Fragment>
  );
}

const routes = [
  {
    path: "/test",
    element: <Test />,
  },
];

export default routes;
