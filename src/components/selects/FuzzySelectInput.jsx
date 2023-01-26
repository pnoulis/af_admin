import * as React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  useListNavigation,
  useHover,
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
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const listRef = React.useRef([]);
  // const [options, setOptions] = React.useState(() =>
  //   items.map((option, i) => ({
  //     ref: null,
  //     label: option.label,
  //     index: i,
  //   }))
  // );
  const Search = React.useRef(null);
  if (Search.current == null) {
    Search.current = new Fuse(items);
  }

  // Each time the user inputs a string in the input
  // the items are filetered to create a new set of options
  const options = React.useMemo(() => {
    if (inputValue === "") {
      return items.map((item, i) => ({
        ref: null,
        label: item,
        id: `${i}-${item}`,
      }));
    }

    const matches = Search.current.search(inputValue);

    return matches.map((match, i) => {
      console.log(match);
      console.log(options);
    });
  }, [inputValue, setInputValue]);

  const data = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
  });

  const interactions = useInteractions([
    useClick(data.context),
    useRole(data.context, { role: "listbox" }),
    useListNavigation(data.context, {
      listRef: options.map((option) => option.label),
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      loop: true,
      focusItemOnOpen: "auto",
      virtual: true,
    }),
  ]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      inputValue,
      setInputValue,
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
  const { refs, getReferenceProps, setInputValue } = useComboboxContext();

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
        placeholder={label}
        onChange={({ target }) => setInputValue(target.value)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

function ComboboxList({ className, renderItem, ...props }) {
  const context = useComboboxContext();
  return (
    <ul>
      {context.options.map((option, i) => renderItem(option, context, i))}
    </ul>
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
  return (
    <li
      className={`combobox-option ${className ? className : ""}`}
      role="option"
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
