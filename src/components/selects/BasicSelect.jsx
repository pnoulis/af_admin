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
import { useKeys } from '/src/hooks';
import './selects.css';


/*
  LISTBOX
  https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
*/

const SelectContext = React.createContext(null);
const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (context == null) {
    throw new Error("Select children components must be wrapped in <Select/>");
  }
  return context;
};

function useSelect({
  allowHover = false,
  gutters = 0,
} = {}) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const listRef = React.useRef([]);
  const listContentRef = React.useRef([]);
  const selectedRef = React.useRef(null);

  const data = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    middleware: [
      flip(),
      shift(),
      offset(gutters),
      size({apply({rects, elements}) {
        elements.floating.style.width = `${rects.reference.width}px`;
      }})
    ],
    whileElementsMounted: autoUpdate,
  });

  const handleSelect = React.useCallback((index) => {
    setSelectedIndex(index);
    selectedRef.current = index ? listRef.current[index] : null;
    setOpen(false);
  }, []);

  const { context } = data;

  const interactions = useInteractions([
    allowHover
      ? useHover(context, {
        handleClose: safePolygon({ restMs: 25 }),
        move: false
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
      setActiveIndex,
      setSelected: handleSelect,
      selectedRef: selectedRef.current,
      listRef: listRef.current,
      listContentRef: listContentRef.current,
    }),
    [open, setOpen, interactions, data]
  );
}

function Select({ onSelected, children, ...options }) {
  const select = useSelect(options);
  return (
    <SelectContext.Provider value={select}>
      {children}
    </SelectContext.Provider>
  );
}

function SelectTrigger({ className,  children, ...props }) {
  const { refs, selectedRef, setOpen, setSelected, getReferenceProps } = useSelectContext();

  return (
    <button
      className={className}
      ref={refs.setReference}
      aria-autocomplete='none'
      {...getReferenceProps({
        ...props
      })}
    >
      {selectedRef?.textContent || children}
    </button>
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
            role='group'
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
  const {
    setSelected, activeIndex, setOpen, listRef,
    listContentRef, getItemProps
  } = useSelectContext();
  const handleKeys = React.useCallback(
    ({code}) => {
      switch (code) {
      case 'Enter':
        setSelected(index);
        break;
      case 'Tab':
        setSelected(null);
        break;
      case 'Escape':
        setSelected(null);
        break;
      default:
        break;
      }
    },
    []
  );
  const bindKeys = useKeys(handleKeys);

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

export {
  Select as BasicSelect,
  SelectTrigger as BasicSelectTrigger,
  SelectOptionList as BasicSelectOptionList,
  SelectOption as BasicSelectOption,
};
