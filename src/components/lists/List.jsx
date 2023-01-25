import * as React from "react";
import {
  useListNavigation,
  useInteractions,
  useFloating,
  useRole,
} from "@floating-ui/react";

/*
  _What is a List?_

  A List represents a sequence of navigable items.

  _Interactivity_

  Lists should be navigable using the keyboard arrow keys.
  If a list consists of link elements they should also be navigable
  using the <TAB> key.
  The element currently receiving focus should indicate it.
  The element upon which the cursor resides if any should indicate it.

 */

const ListContext = React.createContext();
const useListContext = () => {
  const context = React.useContext(ListContext);
  if (context == null) {
    throw new Error("ListItem components must be wrapped in <List/>");
  }
  return context;
};

function useList() {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const { refs, context } = useFloating({ open: true });
  const listRef = React.useRef([]);
  const { getFloatingProps, getItemProps } = useInteractions([
    useListNavigation(context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
    }),
    useRole(context, { role: "menu" }),
  ]);
  return {
    listRef: listRef.current,
    activeIndex,
    getItemProps,
    getFloatingProps,
    refs,
  };
}

function ListItem({ index, children, ...props }) {
  const { activeIndex, listRef, getItemProps } = useListContext();
  return (
    <li
      {...getItemProps({
        ref(node) {
          listRef[index] = node;
        },
        tabIndex: activeIndex === index ? 0 : -1,
        role: "menuitem",
        ...props,
      })}
    >
      {children}
    </li>
  );
}

function List({ children, ...props }) {
  const { refs, getFloatingProps, ...listItems } = useList();
  return (
    <ListContext.Provider value={listItems}>
      <ul ref={refs.setFloating} {...getFloatingProps({ ...props })}>
        {children}
      </ul>
    </ListContext.Provider>
  );
}

export { List, ListItem };
