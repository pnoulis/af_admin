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
import { useKeys } from '/src/hooks';

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
  const [inputValue, setInputValue] = React.useState('');
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
    if (inputValue === "") {
      return items.map((item, i) => ({
        ref: null,
        label: item,
        id: `${i}-${item}`,
      }));
    }

    let matches = Search.current.search(inputValue);
    // matches = matches.map((match, i) => {
    //   return {
    //     ref: null,
    //     label: match.item,
    //     id: `${i}-${match.item}`
    //   };
    // });
    // if (matches.length > 0) {
    //   setActiveIndex(0);
    //   setSelectedIndex(0);
    // } else {
    //   console.log('will reset indexes');
    //   setActiveIndex(null);
    //   setSelectedIndex(null);
    // }

    return matches.map((match, i) => {
      return {
        ref: null,
        label: match.item,
        id: `${i}-${match.item}`
      };
    });

  }, [inputValue, setInputValue]);

  // listRef.current = options.map((option) => option.ref);
  // Handle selection
  const handleOptionSelection = React.useCallback((option) => {

  }, []);


  const data = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
  });

  React.useEffect(() => {
    const down = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      keyCode: 40,
      bubbles: true,
    });
    const up = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      keyCode: 38,
      bubbles: true,
    });
    //   console.log('active inedx is null');
    //   refs.reference.current.dispatchEvent(down);

  }, [options]);



  const interactions = useInteractions([
    useClick(data.context),
    useRole(data.context, { role: "listbox" }),
    useFocus(data.context, { keyboardOnly: true }),
    useDismiss(data.context),
    useListNavigation(data.context, {
      listRef,
      activeIndex,
      selectedIndex,
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
      inputValue,
      setInputValue,
      activeIndex,
      setActiveIndex,
      selectedIndex,
      setSelectedIndex,
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
  const { refs, open, setOpen, getReferenceProps, setInputValue } = useComboboxContext();
  const inputRef = React.useRef(null);

  /* if (index === 0) { */
  /*   node?.dispatchEvent(new KeyboardEvent('keydown', { */
  /*     key: 'ArrowDown' */
  /*   })) */

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
          if (e.code === 'Tab') {
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
        onChange={({ target }) => setInputValue(target.value)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

function ComboboxList({ className, renderItem, ...props }) {
  const state = useComboboxContext();
  const { open, strategy, x, y, setActiveIndex, activeIndex, getFloatingProps, refs, options, context } = state;

  React.useEffect(() => {
    // let b;
    // console.log('mounted');
    // if (index === 0 && activeIndex === null) {
    //   console.log('--------------------------------------------------');
    //   console.log('FIRED EVENT');
    //   console.log(option.ref);
    //   console.log(activeIndex);
    //   const a = new KeyboardEvent('keydown', {
    //     key: 'ArrowDown',
    //     keyCode: 40,
    //     bubbles: true,
    //   });
    //   b = setTimeout(() => {
    //     option.ref?.dispatchEvent(a);
    //   });
    // }

    // return () => clearTimeout(b);
    // By default the 1st option is active
    // if (!open) return;
    // const down = new KeyboardEvent('keydown', {
    //   key: 'ArrowDown',
    //   keyCode: 40,
    //   bubbles: true,
    // });
    // const up = new KeyboardEvent('keydown', {
    //   key: 'ArrowUp',
    //   keyCode: 38,
    //   bubbles: true,
    // });
    // if (activeIndex === null) {
    //   console.log('active inedx is null');
    //   refs.reference.current.dispatchEvent(down);
    // } else {
    //   console.log(`times to dispatch event: ${activeIndex}`);
    //   for (let i = activeIndex; i >= 0; i--) {
    //     console.log('shall dispatch');
    //     console.log(activeIndex);
    //     setTimeout(() => {
    //       refs.reference.current.dispatchEvent(up);
    //     }, 100);
    //   }
    // }
    // let times = activeIndex || 0;
    // times = options.length - activeIndex;
    // console.log(`time: ${times}`);
    // const time = setTimeout(() => {
    //   // refs.reference.current.dispatchEvent(setActive);
    // }, [500]);
    if (open) {
      console.log('will set index');
      setActiveIndex(0);
    }
  }, [open, options]);



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
            {options.map((option, index) =>
              renderItem({option, context: state, index}, index))}
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

  const { refs, listRef, getItemProps, setSelected, activeIndex, setActiveIndex } = context;
  const isActive = activeIndex === index;

  React.useEffect(() => {
    // console.log('options are rendering');
    // let time;
    // if (index === 0 && activeIndex === null) {
      // console.log('oetuhenotuh');
      // const down = new KeyboardEvent('keydown', {
      //   key: 'ArrowDown',
      //   keyCode: 40,
      //   bubbles: true,
      // });
      // time = setTimeout(() => {
      //   console.log('dispatching event');
      //   option.ref.dispatchEvent(down);
      // }, 100);
    //   setTimeout(() => {
    //     option.ref.focus();
    //   }, 200);
    // }

  }, []);

  return (
    <li
    className={`combobox-option ${
isActive ? 'active' : ''
} ${
className || ''
}`}
      id={option.id}
      ref={(node) => {
        option.ref = node;
        console.log('setting up ref');
        listRef[index] = node;
      }}
      role="option"
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onKeyDown(e) {
          if (e.code === 'Enter') {
            e.stopPropagation();
            /* setSelected(option); */
          }
        },
        onClick() {
          setSelected(option);
        }
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
