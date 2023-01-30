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

const ComboboxContext = React.createContext(null);
const useComboboxContext = () => {
  const context = React.useContext(ComboboxContext);
  if (context === null) {
    throw new Error("Combobox components must be wrapped in <Combobox/>");
  }
  return context;
};

function useCombobox(items = [], config = {}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [input, setInput] = React.useState("");
  const optionsRef = React.useRef([]);
  const listRef = React.useRef([]);
  const selected = React.useRef("");

  // @floating-ui
  const data = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
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

  const handleSelection = React.useCallback((option) => {
    selected.current = option || input;
    setOpen(false);
  }, []);

  const handleInput = React.useCallback(({ target }) => {
    setActiveIndex(null);
    setInput(target.value);
  }, []);

  optionsRef.current = React.useMemo(() => {
    return items.map((item, i) => {
      return {
        label: item,
        id: `${i}-${item}`,
        ref: (node) => (listRef.current[i] = node),
      };
    });
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
    [open, setOpen, interactions, data]
  );
}

function Combobox({ items, config, children }) {
  const state = useCombobox(items, config);
  return (
    <ComboboxContext.Provider value={state}>
      {children}
    </ComboboxContext.Provider>
  );
}

function ComboboxTrigger({ className, children, ...props }) {
  const context = useComboboxContext();

  React.useEffect(() => {
    if (!context.open) {
      context.refs.reference.current.blur();
    }
  }, [context.open]);

  return (
    <div
      className={`${className || ""} combobox`}
      ref={context.refs.setReference}
      tabIndex={0}
      {...context.getReferenceProps({
        onKeyDown({ code }) {
          switch (code) {
            case "Enter":
              const selected =
                context.activeIndex >= 0
                  ? context.optionsRef[context.activeIndex].label
                  : context.input;
              context.handleSelection(selected);
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
            context.handleSelection();
          }
        },
        ...props,
      })}
    >
      {children}
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
            className={`${className || ""} combobox-list`}
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
      className={`${className || ""} ${
        isActive ? "active" : ""
      } combobox-option`}
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
      <Combobox items={options}>
        <ComboboxTrigger>
          <input type="text" name="country" id="country" tabIndex={-1} />
          <label htmlFor="country">country</label>
        </ComboboxTrigger>
        <ComboboxList
          renderItem={(props, i) => <ComboboxOption key={i} {...props} />}
        />
      </Combobox>
    </div>
  );
}

export { Test as ComboTest };
