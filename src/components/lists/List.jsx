import * as React from 'react';
import {
  useListNavigation,
  useInteractions,
  useFloating,
  useFocus,
} from '@floating-ui/react';


const ListContext = React.createContext();
const useListContext = () => {
  const context = React.useContext(ListContext);
  if (context == null) {
    throw new Error('ListItem components must be wrapped in <List/>');
  }
  return context;
};

function useList() {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const {refs, context} = useFloating({open: true});
  const listRef = React.useRef([]);
  const {getFloatingProps, getItemProps} = useInteractions([
    useListNavigation(context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
    }),
    useFocus(context)
  ]);
  return {
    listRef: listRef.current,
    activeIndex,
    getItemProps,
    getFloatingProps,
    refs,
  };
}

function ListItem({index, children, ...props}) {
  const {activeIndex, listRef, getItemProps} = useListContext();
  return (
    <li
      ref={(node) => listRef[index] = node}
      tabIndex={activeIndex === index ? 0 : -1}
      {...getItemProps({
        ...props
      })}
      role='menuitem'
    >
      {children}
    </li>
  );
};

function List({children, ...props}) {
  const {refs, getFloatingProps, ...listItems } = useList();
  return (
    <ListContext.Provider value={listItems}>
      <ul
        ref={refs.setFloating}
        {...getFloatingProps({tabIndex: 0, ...props})}
        role='menu'
      >
        {children}
      </ul>
    </ListContext.Provider>
  );
}

export { List, ListItem };
