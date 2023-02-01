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
  useFocus,
  useTypeahead,
  useClick,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { fetch } from "/src/lib";

const fetchPath = "/books";
const fetchParams = {
  _quantity: 100,
  _locale: "en_US",
};

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

function useCombobox(items = [], onSelect = () => {}, config = {}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [input, setInput] = React.useState("");
  const listRef = React.useRef([]);
  const contentRef = React.useRef(items);

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
    config.hover
      ? useHover(data.context, {
          handleClose: safePolygon({ restMs: 25 }),
        })
      : useClick(data.context, { keyboardHandlers: false }),
    useRole(data.context, { role: "listbox" }),
    useFocus(data.context, { keyboardOnly: true }),
    useDismiss(data.context),
    useListNavigation(data.context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
      focusItemOnOpen: true,
    }),
    useTypeahead(data.context, {
      listRef: contentRef,
      activeIndex,
      onMatch: setActiveIndex,
      resetMs: 500,
    }),
  ]);

  const handleSelection = React.useCallback((selection) => {
    setOpen(false);
    setInput(selection);
    onSelect(selection);
  }, []);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      input,
      items,
      listRef: listRef.current,
      handleSelection,
      activeIndex,
      ...data,
      ...interactions,
    }),
    [open, setOpen, interactions, data]
  );
}

function Combobox({ items, onSelect, children, ...config }) {
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
        readOnly
        className={`combobox ${className || ""}`}
        ref={context.refs.setReference}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={context.input}
        {...context.getReferenceProps(props)}
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
          initialFocus={0}
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
            {...context.getFloatingProps({
              onKeyDown({ code }) {
                switch (code) {
                  case "Enter":
                    context.handleSelection(
                      context.listRef[context.activeIndex].textContent
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
                context.handleSelection(
                  context.listRef[context.activeIndex].textContent
                );
              },
              ...props,
            })}
          >
            {context.items.map((item, index) =>
              renderItem({ option: item, context, index }, index)
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
      id={`${index}-${option}`}
      ref={(node) => (context.listRef[index] = node)}
      tabIndex={isActive ? 0 : -1}
      {...context.getItemProps(props)}
    >
      {children || option}
    </li>
  );
}

const items = ["one", "two", "three"];
function TestAsyncCombobox() {
  return (
    <div>
      <Combobox items={items}>
        <ComboboxTrigger name="book" placeholder="select book">
          book
        </ComboboxTrigger>
        <ComboboxList
          renderItem={(props, i) => <ComboboxOption key={i} {...props} />}
        />
      </Combobox>
    </div>
  );
}

export { TestAsyncCombobox };
