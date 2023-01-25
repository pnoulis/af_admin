import * as React from "react";
import { useFl } from "/src/hooks";
import {
  Menu,
  MenuItem,
  BasicMenu,
  Menu2,
  MenuItem2,
} from "/src/components/menus";
import styled from "styled-components";
import {
  useInteractions,
  useFloating,
  useListNavigation,
  FloatingFocusManager,
} from "@floating-ui/react";
import {
  BasicSelect,
  BasicSelectTrigger,
  BasicSelectOptionList,
  BasicSelectOption,
} from "/src/components/selects";

import { BasicDialog } from "/src/components/dialogs";
import { List as MyList, ListItem } from "/src/components/lists";

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

const options = ["one", "two", "three"];

function Test() {
  const [open, setOpen] = React.useState(true);
  console.log(`isOPen:${open}`);
  return (
    <div>
      <p>iam testing</p>
      {/* <button onClick={() => setOpen((prev) => !prev)}>open dialog</button> */}
      <BasicSelect name="country" placeholder="polo">
        <BasicSelectTrigger />
        <BasicSelectOptionList>
          {options.map((option, i) => (
            <BasicSelectOption key={option} index={i}>
              {option}
            </BasicSelectOption>
          ))}
        </BasicSelectOptionList>
      </BasicSelect>
    </div>
  );
}

const routes = [
  {
    path: "/test",
    element: <Test />,
  },
];

export default routes;
