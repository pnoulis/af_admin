import * as React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useHover,
  useInteractions,
  useRole,
  useTypeahead,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useMergeRefs,
  FloatingFocusManager,
} from "@floating-ui/react";
import "./menu.css";

/*
  _What is a Select Menu_
     A Select menu is composed of a text area and a list of options.
     The user is promted to select one of the options at which point
     his selection is displayed in the text area.

  _Interactivity_
     The menu list is not displayed by default. Only the text area is.
     The menu list is displayed either as a response to a hover event
     or a click event.

     If the open state of the menu list is reached through a click event
     then it remains open until the user either:

     1) Clicks on the text area.
     2) Clicks outside of the menu list or textarea
     3) Selects an option. *see selection
     4) The <TAB> or <ESC> key is pressed.

     If the open state of the menu list is reached through a hover event
     then it remains open until the user either:

     1) Moves the pointer away from the text area or menu list
     2) Selects an option. *see selection
     3) The <TAB> or <ESC> key is pressed.

  _Selection_
     There are multiple methods which the user may use to select an option.

     1) By clicking on an option.
     2) By pressing the <ENTER> key on the _focused_ option.

  _Finding / Auto complete_
     Scrolling through a gazzilion of options is cumbersome. As such
     the user is provided with faculties for 'grepping' options.

     When a key press event registers the menu filters through its options.
     The first item to match is selected.
 */

const MenuContext = React.createContext(null);
const useMenuContext = () => {
  const context = React.useContext(MenuContext);
  if (context == null) {
    throw new Error("MenuItem components must be wrapped in <Menu/>");
  }
  return context;
};

function useMenu() {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const listRef = React.useRef([]);
  const listContentRef = React.useRef([]);
  const selectedRef = React.useRef(null);

  const { refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset({ mainAxis: 4, alignmentAxis: 0 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const handleSelect = (index) => {
    setSelectedIndex(index);
    selectedRef.current = listRef.current[index];
    setOpen(false);
  };

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useHover(context, {
        handleClose: safePolygon({ restMs: 25 }),
        move: false,
      }),
      useRole(context),
      useDismiss(context, { role: "menu" }),
      useListNavigation(context, {
        listRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        loop: true,
        focusItemOnOpen: true,
      }),
      useTypeahead(context, {
        listRef: listContentRef,
        activeIndex,
        selectedIndex,
        onMatch: setActiveIndex,
        resetMs: 500,
      }),
    ]
  );

  return {
    open,
    refs,
    context,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    activeIndex,
    setActiveIndex,
    setOpen,
    setSelected: handleSelect,
    selectedRef: selectedRef.current,
    listRef: listRef.current,
    listContentRef: listContentRef.current,
  };
}

function Menu({ className, children }) {
  const {
    open,
    refs,
    getReferenceProps,
    getFloatingProps,
    context,
    selectedRef,
    ...menuItems
  } = useMenu();

  return (
    <MenuContext.Provider value={menuItems}>
      <button
        className={className + " menu"}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {selectedRef ? selectedRef.innerHTML : "menu"}
      </button>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            guards={false}
            modal={false}
          >
            <ul
              className="submenu"
              ref={refs.setFloating}
              style={{
                position: context.strategy,
                top: context.y ?? 0,
                left: context.x ?? 0,
              }}
              {...getFloatingProps()}
            >
              <MenuItem index={0}>one</MenuItem>
              <MenuItem index={1}>two</MenuItem>
              <MenuItem index={2}>three</MenuItem>
              <MenuItem index={3}>four</MenuItem>
            </ul>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </MenuContext.Provider>
  );
}

function MenuItem({ index, label, children, ...props }) {
  const {
    setOpen,
    setSelected,
    activeIndex,
    listRef,
    listContentRef,
    getItemProps,
  } = useMenuContext();
  return (
    <li
      className="menuItem"
      {...getItemProps({
        ref(node) {
          listRef[index] = node;
          listContentRef[index] = node?.textContent ?? null;
        },
        onKeyDown(event) {
          switch (event.key) {
            case "Enter":
              event.stopPropagation();
              setSelected(index);
              break;
            case "Tab":
              event.stopPropagation();
              setOpen(false);
              break;
            default:
              break;
          }
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

export { Menu as Menu2, MenuItem as MenuItem2 };
