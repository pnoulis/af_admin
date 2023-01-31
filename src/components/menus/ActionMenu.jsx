import * as React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  useListNavigation,
  useHover,
  useFocus,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useMergeRefs,
  FloatingFocusManager,
} from "@floating-ui/react";

const MenuContext = React.createContext(null);
const useMenuContext = () => {
  const context = React.useContext(MenuContext);
  if (context == null) {
    throw new Error("Menu components must be wrapped in <Menu/>");
  }
  return context;
};

function useMenu(config) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const listRef = React.useRef([]);

  const data = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      shift(),
      offset(),
      size({
        apply({ rects, elements }) {
          elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
    ],
  });

  const interactions = useInteractions([
    useClick(data.context, { keyboardHandlers: false }),
    useRole(data.context, { role: "menu" }),
    useFocus(data.context, { keyboardOnly: true }),
    useDismiss(data.context),
    useListNavigation(data.context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
      focusItemOnOpen: true,
    }),
  ]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      listRef: listRef.current,
      activeIndex,
      ...data,
      ...interactions,
    }),
    [open, setOpen, interactions, data]
  );
}

function Menu({ children, ...config }) {
  const state = useMenu(config);
  return <MenuContext.Provider value={state}>{children}</MenuContext.Provider>;
}

function MenuTrigger({ className, children, ...props }) {
  const context = useMenuContext();

  return (
    <div
      className={`menu-trigger ${className || ""}`}
      ref={context.refs.setReference}
      {...context.getReferenceProps(props)}
    >
      <button>{children}</button>
    </div>
  );
}

function MenuList({ children, className, ...props }) {
  const context = useMenuContext();

  return (
    <FloatingPortal>
      {context.open && (
        <FloatingFocusManager
          context={context.context}
          initialFocus={-1}
          guards={false}
          modal={false}
        >
          <ul
            className={`menu-list ${className || ""}`}
            ref={context.refs.setFloating}
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
            }}
            {...context.getFloatingProps(props)}
          >
            {children}
          </ul>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
}

function MenuListMember({ index, className, children, ...props }) {
  const context = useMenuContext();
  const isActive = context.activeIndex === index;

  React.useEffect(() => {
    console.log(`menu list member open:${context.open}`);
  }, [context.open]);

  return (
    <li
      className={`menu-member`}
      ref={(node) => (context.listRef[index] = node)}
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      {...context.getItemProps(props)}
    >
      {children}
    </li>
  );
}

function MenuListMember2({ index, render, className, children, ...props }) {
  const context = useMenuContext();
  const isActive = context.activeIndex === index;
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <li
      className={`menu-member ${className || ""} ${isActive ? "active" : ""}`}
      ref={(node) => (context.listRef[index] = node)}
      role="menuitem"
      tabIndex={isActive ? 0 : -1}
      {...context.getItemProps(props)}
    >
      {render({
        isActive,
        isSelected,
        onSelection(handler) {
          context.setOpen(false);
          handler();
        },
      })}
    </li>
  );
}

function SomeMenu({ isActive, isSelected, onSelection }) {
  console.log(`isActive:${isActive}`);
  console.log(`isSelected:${isSelected}`);
  console.log(`onSelection:${onSelection}`);
  return <div>some menu</div>;
}

function TestActionMenu() {
  return (
    <div>
      <Menu>
        <MenuTrigger>click me</MenuTrigger>
        <MenuList>
          <MenuListMember index={0}>
            <a style={{ display: "block", width: "100%" }} href="/home">
              take me
            </a>
          </MenuListMember>
          <MenuListMember index={1}>edit</MenuListMember>
          <MenuListMember index={2}>clear</MenuListMember>
          <MenuListMember2
            index={3}
            render={(props) => <SomeMenu {...props} />}
          />
        </MenuList>
      </Menu>
    </div>
  );
}

export { TestActionMenu };
