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
  useId,
  useDismiss,
  useInteractions,
  useRole,
  useClick,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import Fuse from "fuse.js";
import { useKeys } from "/src/hooks";

const ComboboxContext = React.createContext(null);
const useComboboxContext = () => {
  const context = React.useContext(ComboboxContext);
  if (context == null) {
    throw new Error("Combobox components must be wrapped in <Combobox/>");
  }
  return context;
};

function useCombobox(items = [], config = {}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [selected, setSelected] = React.useState("");
  const listRef = React.useRef([]);

  // fuzzy search provided by https://fusejs.io/
  const Search = React.useRef(null);
  if (Search.current == null) {
    Search.current = new Fuse(items, {
      threshold: 0.1,
    });
  }

  // Each time the user inputs a string in the input
  // the items are filetered to create a new set of options
  const options = React.useMemo(() => {
    console.log("input value ref changed");
    if (selected === "") {
      return items.map((item, i) => {
        return {
          ref: null,
          label: item,
          id: `${i}-${item}`,
        };
      });
    }

    let matches = Search.current.search(selected);
    return matches.map((match, i) => {
      return {
        ref: null,
        label: match.item,
        id: `${i}-${match.item}`,
      };
    });
  }, [selected, setSelected]);

  // Handle selection
  const handleSelection = React.useCallback((option) => {
    // When is handleOptionSelection emmited?
    // When the user presses enter.
    // When the user clicks on one of the options
  }, []);

  const handleInput = React.useCallback(({ target }) => {
    console.log(`handle input callback: ${target.value}`);
    setActiveIndex(null);
    setSelected(target.value);
  }, []);

  const data = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
  });

  const interactions = useInteractions([
    useClick(data.context, { keyboardHandlers: false }),
    useRole(data.context, { role: "listbox" }),
    useFocus(data.context, { keyboardOnly: true }),
    useDismiss(data.context),
    useListNavigation(data.context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
      focusItemOnOpen: false,
      virtual: true,
    }),
  ]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      handleInput,
      activeIndex,
      setActiveIndex,
      listRef: listRef.current,
      options,
      ...data,
      ...interactions,
    }),
    [open, setOpen, interactions, data, options]
  );
}

function Combobox({ items, onSelected, children, ...config }) {
  const state = useCombobox(items, config);

  return (
    <ComboboxContext.Provider value={state}>
      {children}
    </ComboboxContext.Provider>
  );
}

function ComboboxTrigger({ name, label, className, children, ...props }) {
  const { refs, open, setOpen, getReferenceProps, handleInput } =
    useComboboxContext();
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [open]);

  return (
    <div
      className={className || "" + " combobox"}
      ref={refs.setReference}
      {...getReferenceProps({
        ...props,
        onKeyDown(e) {
          if (e.code === "Tab") {
            setOpen(false);
          }
        },
      })}
    >
      <input
        type="text"
        id={name}
        ref={inputRef}
        name={name}
        autoComplete="off"
        placeholder={label}
        onChange={handleInput}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

function ComboboxList({ className, renderItem, ...props }) {
  const state = useComboboxContext();
  const {
    open,
    strategy,
    x,
    y,
    setActiveIndex,
    activeIndex,
    getFloatingProps,
    refs,
    options,
    context,
  } = state;

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
            <div onClick={() => setActiveIndex(0)}> on click set to 1</div>
            <div onClick={() => setActiveIndex(1)}> on click set to 2</div>
            <div onClick={() => setActiveIndex(2)}> on click set to 3</div>
            {options.map((option, index) =>
              renderItem({ option, context: state, index }, index)
            )}
          </ul>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
}

function ComboboxOption({
  option,
  context,
  index,
  className,
  children,
  ...props
}) {
  const { listRef, getItemProps, activeIndex } = context;
  const isActive = activeIndex === index;

  return (
    <li
      className={`combobox-option ${isActive ? "active" : ""} ${
        className || ""
      }`}
      id={option.id}
      ref={(node) => {
        option.ref = node;
        listRef[index] = node;
      }}
      role="option"
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        ...props,
      })}
    >
      {children || option.label}
    </li>
  );
}

export {
  Combobox as FuzzyCombobox,
  ComboboxTrigger as FuzzyComboboxTrigger,
  ComboboxList as FuzzyComboboxList,
  ComboboxOption as FuzzyComboboxOption,
};
