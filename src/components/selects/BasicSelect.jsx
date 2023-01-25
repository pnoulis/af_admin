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
import "./selects.css";

const SelectContext = React.createContext(null);
const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (context == null) {
    throw new Error("Select children components must be wrapped in <Select/>");
  }
  return context;
};

function useSelect() {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const listRef = React.useRef([]);
  const listContentRef = React.useRef([]);
  const selectedRef = React.useRef(null);

  const data = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom",
    middleware: [offset({ mainAxis: 4, alignmentAxis: 0 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const handleSelect = React.useCallback((index) => {
    setSelectedIndex(index);
    selectedRef.current = listRef.current[index];
    setOpen(false);
  }, []);

  const { context } = data;

  const interactions = useInteractions([
    // useHover(context, {
    //   handleClose: safePolygon({ restMs: 25 }),
    //   move: false,
    // }),
    useClick(context),
    useRole(context, { role: "listbox" }),
    useDismiss(context),
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
      setActiveIndex,
      setSelected: handleSelect,
      selectedRef: selectedRef.current,
      listRef: listRef.current,
      listContentRef: listContentRef.current,
    }),
    [open, setOpen, interactions, data]
  );
}

function Select({ name, placeholder, onSelected, children, ...props }) {
  const select = useSelect();
  return (
    <SelectContext.Provider value={{ name, placeholder, ...select }}>
      {children}
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className, ...props }) {
  const { name, placeholder, refs, getReferenceProps } = useSelectContext();

  return (
    <label
      className={className}
      ref={refs.setReference}
      aria-autocomplete="none"
      style={{ display: "inline-block", width: "min-content" }}
      {...getReferenceProps({
        ...props,
      })}
    >
      <input
        readOnly
        type="text"
        style={{ width: "100%", height: "100%" }}
        value={placeholder ?? name}
        name={name}
        id={name}
        autoComplete="off"
      />
      {name}
    </label>
  );
}

function SelectOptionList({ className, children, ...props }) {
  const { y, x, open, strategy, context, refs, getFloatingProps } =
    useSelectContext();

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
            className={className}
            ref={refs.setFloating}
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

function SelectOption({ index, className, children, ...props }) {
  const { setSelected, activeIndex, listRef, listContentRef, getItemProps } =
    useSelectContext();

  return (
    <li
      className={className}
      ref={(node) => {
        listRef[index] = node;
        listContentRef[index] = node?.textContent ?? null;
      }}
      tabIndex={activeIndex === index ? 0 : -1}
      role="option"
      {...getItemProps({
        ...props,
      })}
    >
      {children}
    </li>
  );
}

export {
  Select as BasicSelect,
  SelectTrigger as BasicSelectTrigger,
  SelectOptionList as BasicSelectOptionList,
  SelectOption as BasicSelectOption,
};
