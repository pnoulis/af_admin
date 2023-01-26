import * as React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  useListNavigation,
  useHover,
  useInteractions,
  useRole,
  useTypeahead,
  useClick,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useKeys } from "/src/hooks";
import "./selects.css";

/*
  Combobox - not editable
  https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
*/

const ComboboxContext = React.createContext(null);
const useComboboxContext = () => {
  const context = React.useContext(ComboboxContext);
  if (context == null) {
    throw new Error(
      "Combobox children components must be wrapped in <Combobox/>"
    );
  }
  return context;
};

function useCombobox({ allowHover = false, gutters = 0 } = {}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const listRef = React.useRef([]);
  const listContentRef = React.useRef([]);
  const selectedRef = React.useRef(null);

  const data = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [
      flip(),
      shift(),
      offset(gutters),
      size({
        apply({ rects, elements }) {
          elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const handleSelect = React.useCallback((index) => {
    setSelectedIndex(index);
    selectedRef.current = index >= 0 ? listRef.current[index] : null;
    setOpen(false);
  }, []);

  const { context } = data;

  const interactions = useInteractions([
    allowHover
      ? useHover(context, {
          handleClose: safePolygon({ restMs: 25 }),
          move: false,
        })
      : useClick(context),
    useRole(context, { role: "listbox" }),
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
  ]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...data,
      ...interactions,
      activeIndex,
      setSelected: handleSelect,
      selectedRef: selectedRef.current,
      listRef: listRef.current,
      listContentRef: listContentRef.current,
    }),
    [open, setOpen, interactions, data]
  );
}

function Combobox({ name, placeholder, onSelected, children, ...options }) {
  const combobox = useCombobox(options);
  combobox.name = name;
  combobox.placeholder = placeholder;
  return (
    <ComboboxContext.Provider value={combobox}>
      {children}
    </ComboboxContext.Provider>
  );
}

function ComboboxTrigger({ className, children, ...props }) {
  const { name, placeholder, refs, selectedRef, getReferenceProps } =
    useComboboxContext();

  return (
    <div
      className={className || "" + " combobox-trigger"}
      ref={refs.setReference}
      {...getReferenceProps({
        ...props,
      })}
    >
      <input
        readOnly
        type="text"
        id={name}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        value={selectedRef?.textContent || ""}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

function ComboboxList({ className, children, ...props }) {
  const { y, x, open, strategy, context, refs, getFloatingProps } =
    useComboboxContext();

  return (
    <FloatingPortal>
      {open && (
        <FloatingFocusManager
          context={context}
          initialFocus={-1}
          guards={false}
          modal={false}
        >
          <ul
            className={className || "" + " combobox-list"}
            ref={refs.setFloating}
            role="group"
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps({
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

function ComboboxOption({ index, className, children, ...props }) {
  const { setSelected, activeIndex, listRef, listContentRef, getItemProps } =
    useComboboxContext();
  const handleKeys = React.useCallback(({ code }) => {
    switch (code) {
      case "Enter":
        setSelected(index);
        break;
      case "Tab":
        setSelected(null);
        break;
      case "Escape":
        setSelected(null);
        break;
      default:
        break;
    }
  }, []);
  const bindKeys = useKeys(handleKeys);

  return (
    <li
      className={className || "" + " combobox-option"}
      ref={(node) => {
        listRef[index] = node;
        listContentRef[index] = node?.textContent ?? null;
      }}
      tabIndex={activeIndex === index ? 0 : -1}
      role="option"
      {...getItemProps({
        ...bindKeys(),
        onClick() {
          setSelected(index);
        },
        ...props,
      })}
    >
      {children}
    </li>
  );
}

export { Combobox, ComboboxTrigger, ComboboxList, ComboboxOption };
