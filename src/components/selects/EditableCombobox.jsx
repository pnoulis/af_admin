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

/*
  What is a combobox?
  https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

  The editable combobox is a variation of the combobox component.
  It allows the user to filter through the available options or provide
  a custom value.

  Per ARIA terminology the combobox defined within is described as:

  * Editable Combobox
  * The popup has a role of 'listbox'
  * Each option has a role of 'option'
  * The autocomplete behavior is defined as: 'List autocompelete with manual selection'
  *

  INTERACTIONS:

  on Tab:

      if state is not open:

      - comboboxTrigger is focused.
      - comboboxList is revealed/opened.

      if state is open:

      - comboboxTrigger is blurred.
      - comboboxList is hidden/closed.
      - previous selection if any is not interfered with.

  on Esc:
      - comboboxTrigger is blurred.
      - comboboxList is hidden/closed.
      - previous selection if any is not interfered with.

  on Enter:
      - comboboxTrigger is blurred.
      - comboboxList is hidden/closed.

      - A selection choice is made:

      If an option was active at the time it is marked as the selection of the
      combobox, otherwise the input value of the text input is marked as
      selected.

      - invoke the onSelect handler providing it with the selection

  on Click outside the boundaries of the combobox:
      - comboboxTrigger is blurred.
      - comboboxList is hidden/closed.
      - previous selection if any is not interfered with.

  on Click within one of the options:
      - comboboxTrigger is blurred.
      - comboboxList is hidden/closed.
      - The option that was the target of the event is marked as selected
      - invoke the onSelect handler providing it with the selection.

  on Click within the combobox trigger:

      if state is not open:
      - comboboxTrigger is focused.
      - comboboxList is revealed/opened.

      if state is open:
      - comboboxTrigger is blurred.
      - comboboxList is hidden/closed.

      If an option was active at the time it is marked as the selection of the
      combobox, otherwise the input value of the text input is marked as
      selected.

      - invoke the onSelect handler providing it with the selection

  USAGE:

  const items = ['one', 'two', 'three'];
  const handleSelect = (selected) => console.log(`selected is:${selected}`);

  <EditableCombobox items={options} onSelect={handleSelect}>
     <EditableComboboxTrigger name='country' placeholder='select a country'>
        country
     </EditableComboboxTrigger>
     <EditableComboboxList
        renderItem={(props, i) => (
            <EditableComboboxOption key={i} {...props}/>
        )}
     />
  </EditableCombobox>


  CUSTOMIZATION:

  The component has been designed in such a way to allow for visual design
  customizations.

  The components which render markup that can be designed are:

  <ComboboxTrigger/> <div><input/><label/></div/>
  <ComboboxList/> <ul/>
  <ComboboxOption/> <li/>

  Each of these is given a className of respectively:
  combobox-trigger
  combobox-list
  combobox-option

  When the combobox is open the trigger is added the active class:
  combobox-trigger active

  Customization using styled-components:

  const RedComboboxTrigger = styled(ComboboxTrigger)`
  background-color: red;
  `

  const GreenComboboxList = styled(ComboboxList)`
  background-color: green;
  `

  const YellowComboboxOption = styled(ComboboxOption)`
  background-color: green;
  `

  The comboboxOption and comboboxTrigger render their children which
  means that their contents can be any arbitrary react component
  making them not only customizable in terms of appearance but also
  of content.

  Example:
  <ComboboxOption>
  <img src={...} alt='dog'/>
  <p>click me you will get a dog</p/>
  </ComboboxOption/>

  The comboboxTrigger is half way content customizable.
  the children are rendered as children of the label component:

  <div>
  <input/>
  <label>{children}</label/>
  </div>

  Therefore:
  <ComboboxTrigger>
  <p>within label</p>
  </ComboboxTrigger/>

 */

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

  // apply filtering if any
  listRef.current = [];
  optionsRef.current = React.useMemo(() => {
    if (!open) {
      return [];
    } else if (input === "") {
      return items.map((item, i) => ({
        label: item,
        id: `${i}-${item}`,
        ref: (node) => (listRef.current[i] = node),
      }));
    } else {
      return Search.current.search(input).map((match, i) => ({
        label: match.item,
        id: `${i}-${match.item}`,
        ref: (node) => (listRef.current[i] = node),
      }));
    }
  }, [open, setOpen, input, setInput]);

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
        autoComplete="off"
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

export {
  Combobox as EditableCombobox,
  ComboboxTrigger as EditableComboboxTrigger,
  ComboboxList as EditableComboboxList,
  ComboboxOption as EditableComboboxOption,
};
