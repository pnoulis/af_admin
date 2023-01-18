import * as React from "react";
import {
  useFloating,
  useInteractions,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
} from "@floating-ui/react";

function Tooltip_0() {
  const [open, setOpen] = React.useState(false);
  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <React.Fragment>
      <div ref={refs.setReference} {...getReferenceProps()}>
        reference element
      </div>
      {open && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
          }}
          {...getFloatingProps()}
        >
          tooltip element
        </div>
      )}
    </React.Fragment>
  );
}

export { Tooltip_0 };
