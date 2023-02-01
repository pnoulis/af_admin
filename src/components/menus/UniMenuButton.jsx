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
  FloatingFocusManager,
} from "@floating-ui/react";

/*
  What is a Menu Button?
  https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/

  A Menu Button is a variation of the 'Menu' pattern.
  It consists of a button upon which interaction it is
  toggled to reveal a menu. Usually each menu member
  can itself be a menu revealing a *submenu*. This is not
  the case for the component exported defined below. This component
  does not support nested submenus. This is a conscious choice. It
  makes the component much more easy to maintain. THis is why
  the exported component is added a prefix of Uni as in:
  uni-directional. The menu only open in one direction instead of
  bi-directional where the menu may reveal submenus in the cross-axis.


  Per Aria guidelines the Button Menu should follow these guidelines:

  * The Menu has the following aria attributes some of which are optional:
    role=menu
    aria-haspopup=true
    aria-expanded= if in open state ? true : false
    aria-controls[optional]= the id of the popup element
  * Each member of the menu popup has the following aria attributes:
    role=menuitem

  INTERACTIONS

  on TAB:
    if state is not open:

    - menu toggles to open state.
    - menu list is revealed / opened.
    - 1st menu list member is focused.

    if state is open:

    - menu toggles to closed state.
    - menu list is hidden / closed.
    - no selection takes place.

  on ESC:
    - menu toggles to closed state.
    - menu list is hidden / closed.
    - no selection takes place.

  on ENTER:
    - The currently active(focused) menu list member if any
    is marked as selected.
    - handleSelection handler is fired.
    - menu toggles to closed state.
    - menu list is hidden / closed.

  on CLICK outside the boundaries of the menu:
    - menu toggles to closed state.
    - menu list is hidden / closed.
    - no selection takes place.

  on CLICK within the menu trigger:
    if state is not open:

    - menu toggles to open state.
    - menu list is revelead / opened.
    - 1st menu list member is focused.

    if state is open:

    - menu toggles to closed state.
    - menu list is hidden / closed.
    - no selection takes place.

  on CLICK within one of the menu list members:
    - the target element of the click event is marked as selected.
    - handleSelection handler is fired.
    - menu toggles to closed state.
    - menu list is hidden / closed.

  on HOVER within the menu trigger: (If menu is hoverable it is not clickable)
    - menu toggles to open state.
    - menu list is revealed / opened.

  on HOVER within one of the menu list members:
    - menu list member is marked as active.

  on DOWN key press:
    - The next menu list member is focused. If the last menu list member
    is reached the focus loops back to the 1st menu list member

  on UP key press:
    - The previous menu list member is focused. If the first menu list member
    is reached the focus loops back to the last menu list member.


  USAGE:

  <Menu>
   <MenuTrigger>toggle menu</MenuTrigger/>
   <MenuList>

      <MenuListMember
      index={0}
      render={(props) => <Component {...props}/>}
      />

      <MenuListMember
      index={1}
      render={(props) => <Component {...props}/>}
      />

      // The MenuListMember uses the render pattern.
      // the rendered component is provided with the following props:

      // props = {
         isActive,
         isSelected,
         handleSelection(handler) {
           handler()
           context.setOpen(false);
           context.setSelectedIndex(null);
         }
      }

      // The render pattern allows for:
      // 1. complete content customizabilty
          The MenuListMember wraps its children with a <li>
          THe user is therefore allowed to supply his own component.
      // 2. Each component can supply its own onSelected handler.
          Through the prop handleSelection()

  </MenuList>
  </Menu/>

  <Menu/> props:
     hover
   When the hover flag is provided the menu shall toggle its state
   using the onHover event instead of onClick


    <MenuListMember /> props:
       noFocus
    The noFocus attribute is toggled to enable the following behavior:
    Consider the case where one wants to trap focus within the MenuListMember
    such as when there is a nested <input> or <a>.
    Such behavior can be enabled as such:

    <MenuListMember noFocus render={(props) => <Component {...props}/>}/>

    Where component:
    function Component({isActive, isSelected, handleSelection}) {
    const navigate = useNavigate();
    const myRef = React.useRef(null);

    React.useEffect(() => {
    if (isSelected) {
      handleSelection(() => {
         navigate('/.../...');
       })
    }
    }, [isSelected]);

    React.useEffect(() => {
    if (isActive) {
       myRef.current.focus();
    }
    }, [isActive])

    return (
      <div>
      <a ref={myRef} href={'/.../..'}>click me</a>
      </div>
    );
    }

  CUSTOMIZATIONS:

  The component has been designed in such a way as to allow
  for visual design customizations.

  The components which render markup that can be designed are:

  <MenuTrigger/> -> <div></div>
  <MenuList/> -> <ul></ul/>
  <MenuListMember/> -> <li></li/>

  Each of this is given a classname of:
  menu-trigger
  menu-list
  menu-member

  The active(focused) menu-member is added a className of active:
  menu-member active

  Customization using styled-components:
  const PaddedMenuList = styled(MenuList)`
  padding: 20px;

 */

const MenuContext = React.createContext(null);
const useMenuContext = () => {
  const context = React.useContext(MenuContext);
  if (context == null) {
    throw new Error("Menu components must be wrapped in <Menu/>");
  }
  return context;
};

function useMenu(config = {}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
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
          elements.floating.style.minWidth = `${rects.reference.width}px`;
        },
      }),
    ],
  });

  const interactions = useInteractions([
    config.hover
      ? useHover(data.context, {
          handleClose: safePolygon({ restMs: 25 }),
        })
      : useClick(data.context, { keyboardHandlers: false }),
    useRole(data.context, { role: "menu" }),
    useFocus(data.context, { keyboardOnly: true }),
    useDismiss(data.context),
    useListNavigation(data.context, {
      listRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      loop: true,
      focusItemOnOpen: true,
    }),
  ]);

  if (!open) {
    listRef.current = [];
  }

  return React.useMemo(
    () => ({
      open,
      setOpen,
      listRef: listRef.current,
      activeIndex,
      selectedIndex,
      setSelectedIndex,
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
            {...context.getFloatingProps({
              onKeyDown(e) {
                switch (e.code) {
                  case "Tab":
                    e.preventDefault();
                    context.setOpen(false);
                    break;
                  case "Enter":
                    e.preventDefault();
                    context.setSelectedIndex(context.activeIndex);
                    break;
                  default:
                    break;
                }
              },
              ...props,
            })}
          >
            {children}
          </ul>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
}

function MenuListMember({
  index,
  noFocus,
  render,
  className,
  children,
  ...props
}) {
  const context = useMenuContext();
  const isActive = context.activeIndex === index;

  return (
    <li
      className={`menu-member ${isActive ? "active" : ""} ${className || ""}`}
      ref={(node) => (context.listRef[index] = node)}
      role="menuitem"
      tabIndex={noFocus ? null : isActive ? 0 : -1}
      {...context.getItemProps({
        onClick() {
          context.setSelectedIndex(index);
        },
        ...props,
      })}
    >
      {render({
        isActive,
        isSelected: context.selectedIndex === index,
        handleSelection(handler) {
          handler();
          context.setOpen(false);
          context.setSelectedIndex(null);
        },
      })}
    </li>
  );
}

export {
  Menu as UniMenuButton,
  MenuTrigger as UniMenuButtonTrigger,
  MenuList as UniMenuButtonList,
  MenuListMember as UniMenuButtonListMember,
};
