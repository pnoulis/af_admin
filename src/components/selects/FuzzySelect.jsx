import * as React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  useListNavigation,
  useFocus,
  useDismiss,
  useInteractions,
  useRole,
  useClick,
  autoUpdate,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import Fuse from "fuse.js";

const ComboboxContext = React.createContext(null);
const useComboboxContext = () => {
  const context = React.useContext(ComboboxContext);
  if (context === null) {
    throw new Error("Combobox components must be wrapped in <Combobox/>");
  }
  return context;
};

function useCombobox(items = [], onSelect = () => {}, config = {}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [input, setInput] = React.useState("");
  const optionsRef = React.useRef([]);
  const listRef = React.useRef([]);

  // @floating-ui
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

  // @floating-ui
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

  // fuzzy search provided by https://fusejs.io/
  const Search = React.useRef(null);
  if (Search.current == null) {
    Search.current = new Fuse(items, {
      threshold: 0.1,
    });
  }

  const handleSelection = React.useCallback((selection) => {
    setOpen(false);
    setInput(selection);
    onSelect(selection);
  }, []);

  const handleInput = React.useCallback(({ target }) => {
    setActiveIndex(null);
    setInput(target.value);
  }, []);

  optionsRef.current = React.useMemo(() => {
    if (input === "") {
      return items.map((item, i) => ({
        label: item,
        id: `${i}-${item}`,
        ref: (node) => (listRef.current[i] = node),
      }));
    }

    return Search.current.search(input).map((match, i) => ({
      label: match.item,
      id: `${i}-${match.item}`,
      ref: (node) => (listRef.current[i] = node),
    }));
  }, [input, setInput]);

  if (!open) {
    optionsRef.current = [];
    listRef.current = [];
  }

  return React.useMemo(
    () => ({
      open,
      setOpen,
      input,
      handleInput,
      handleSelection,
      optionsRef: optionsRef.current,
      activeIndex,
      ...data,
      ...interactions,
    }),
    [open, setOpen, interactions, data, input, setInput]
  );
}

function Combobox({ items, onSelect, config, children }) {
  const state = useCombobox(items, onSelect, config);
  return (
    <ComboboxContext.Provider value={state}>
      {children}
    </ComboboxContext.Provider>
  );
}

function ComboboxTrigger({ name, placeholder, className, children, ...props }) {
  const context = useComboboxContext();

  React.useEffect(() => {
    if (!context.open) {
      context.refs.reference.current.blur();
    }
  }, [context.open]);

  return (
    <div>
      <input
        className={`${className || ""} combobox`}
        ref={context.refs.setReference}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={context.handleInput}
        value={context.input}
        {...context.getReferenceProps({
          onKeyDown({ code }) {
            switch (code) {
              case "Enter":
                context.handleSelection(
                  context.activeIndex != null
                    ? context.optionsRef[context.activeIndex].label
                    : context.input
                );
                break;
              case "Tab":
                context.setOpen(false);
                break;
              default:
                break;
            }
          },
          onClick() {
            if (context.open) {
              context.handleSelection(context.input);
            }
          },
          ...props,
        })}
      />
      <label htmlFor={name}>{children}</label>
    </div>
  );
}

function ComboboxList({ renderItem, className, ...props }) {
  const context = useComboboxContext();

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
            className={`combobox-list ${className || ""}`}
            ref={context.refs.setFloating}
            role="group"
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
            }}
            {...context.getFloatingProps(props)}
          >
            {context.optionsRef.map((option, index) =>
              renderItem({ option, context, index }, index)
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
  const isActive = context.activeIndex === index;

  return (
    <li
      className={`combobox-option ${className || ""} ${
        isActive ? "active" : ""
      }`}
      role="option"
      id={option.id}
      ref={(node) => option.ref(node)}
      tabIndex={isActive ? 0 : -1}
      {...context.getItemProps({
        onClick() {
          context.handleSelection(option.label);
        },
        ...props,
      })}
    >
      {children || option.label}
    </li>
  );
}

const options = ["one", "two", "three"];
function Test() {
  return (
    <div>
      <Combobox
        items={options}
        onSelect={(selected) => {
          console.log(`this was selected:${selected}`);
        }}
      >
        <ComboboxTrigger name={"country"} placeholder={"selecte a country"}>
          country
        </ComboboxTrigger>
        <ComboboxList
          renderItem={(props, i) => <ComboboxOption key={i} {...props} />}
        />
      </Combobox>
    </div>
  );
}

export { Test as ComboTest };
