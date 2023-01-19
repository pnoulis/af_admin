import * as React from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useTooltipContext } from "./TooltipContext";

const TooltipTrigger = React.forwardRef(function TooltipTrigger(
  { children, asChild = false, ...props },
  propRef
) {
  const context = useTooltipContext();
  const childrenRef = children.ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }

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

export default TooltipTrigger;
export { TooltipTrigger };
