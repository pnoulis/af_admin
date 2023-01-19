import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";

function useDropdown({
  initialOpen = false,
  placement,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "end",
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;
  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const interactions = useInteractions([click, focus, dismiss]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  );
}

const DropdownContext = React.createContext(null);
const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);
  if (context == null) {
    throw new Error("Dropdown components must be wrapped in <Dropdown />");
  }

  return context;
};

function Dropdown({ children, ...options }) {
  const dropdown = useDropdown(options);
  return (
    <DropdownContext.Provider value={dropdown}>
      {children}
    </DropdownContext.Provider>
  );
}

const DropdownTrigger = React.forwardRef(function DropdownTrigger(
  { children, asChild = false, ...props },
  propRef
) {
  const context = useDropdownContext();
  const childrenRef = children.ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);
  return (
    <button
      ref={ref}
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

const DropdownContent = React.forwardRef(function DropdownContent(
  props,
  propRef
) {
  const { context: floatingContext, ...context } = useDropdownContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  return (
    <FloatingPortal>
      {context.open && (
        <FloatingFocusManager context={floatingContext} modal={false}>
          <div
            ref={ref}
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
              width: "max-content",
              ...props.style,
            }}
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
});
export { Dropdown, DropdownTrigger, DropdownContent };
