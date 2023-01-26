import * as React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  useListNavigation,
  useHover,
  useDismiss,
  useInteractions,
  useRole,
  useClick,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useKeys } from "/src/hooks";
import Fuse from "fuse.js";
import { format as jsonFormat } from "pretty-format";
import "./selects.css";

/*
  Combobox - Editable
  https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

  Autocompletion - filtering:
  List autocomplete with manual selection.
  When the popup is triggered, it presents suggested values. If the combobox is
  editable, the suggested values complete or logically correspond to the
  characters typed in the combobox. The character string the user has typed will
  become the value of the combobox unless the user selects a value in the popup.

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
  const [search, setSearch] = React.useState("");

  const fuseRef = React.useRef(null);
  const listRef = React.useRef([
    /* <HTMLElement> */
  ]);
  const listContentRef = React.useRef([
    /* <String> */
  ]);
  const optionRef = React.useRef([]);
  /*
    Why not merge the previous identifiers into something that looks like these:
    listRef = [
      {
       element: <htmlElement/>,
       content: <string/>,
       filtered: <boolean/>
      }
    ]

    Because floating-ui does not have provisions in place for handling
    composite values.
   */

  listRef.current = optionRef.current.map((option) => option.element);
  listContentRef.current = optionRef.current.map((option) => option.label);

  if (listContentRef.current.length > 0 && fuseRef.current === null) {
    fuseRef.current = new Fuse(listContentRef.current);
  }

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
    setOpen(false);
  });

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
      focusItemOnOpen: "auto",
      virtual: true,
    }),
    useDismiss(context, {
      escapeKey: true,
      outsidePress: true,
    }),
  ]);

  console.log(listRef.current);
  console.log(activeIndex);
  console.log(selectedIndex);

  return {
    open,
    setOpen,
    ...data,
    ...interactions,
    activeIndex,
    search,
    setSearch,
    selectedIndex,
    setSelected: handleSelect,
    optionRef: optionRef.current,
    fuseRef,
  };
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
  const {
    name,
    open,
    search,
    setSearch,
    placeholder,
    refs,
    selectedIndex,
    optionRef,
    getReferenceProps,
    fuseRef,
  } = useComboboxContext();
  const [value, setValue] = React.useState(
    selectedIndex > 0 ? optionRef[selectedIndex].label : ""
  );

  const handleInput = React.useCallback(
    ({ target }) => {
      const result = fuseRef.current.search(target.value);
      optionRef.forEach((option) => {
        if (target.value === "") {
          option.filtered = false;
        } else {
          option.filtered = true;
        }
      });

      result.forEach((match) => {
        optionRef[match.refIndex].filtered = false;
      });

      setSearch(target.value);
    },
    [optionRef]
  );

  return (
    <div
      className={className || "" + " combobox-trigger"}
      ref={refs.setReference}
      {...getReferenceProps({
        ...props,
      })}
    >
      <input
        type="text"
        id={name}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        /* value={value} */
        onChange={handleInput}
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

function ComboboxOption({ index, label, className, children, ...props }) {
  const { setSelected, activeIndex, optionRef, getItemProps } =
    useComboboxContext();

  optionRef[index] ||= {
    element: null,
    label: label,
    filtered: false,
  };

  if (optionRef[index].filtered) {
    return null;
  }

  return (
    <li
      className={className || "" + " combobox-option"}
      id={`${index}-${label}`}
      ref={(node) => (optionRef[index].element = node)}
      tabIndex={activeIndex === index ? 0 : -1}
      role="option"
      {...getItemProps({
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

export {
  Combobox as EditableCombobox,
  ComboboxTrigger as EditableComboboxTrigger,
  ComboboxList as EditableComboboxList,
  ComboboxOption as EditableComboboxOption,
};
