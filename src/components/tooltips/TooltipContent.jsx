import * as React from "react";
import { FloatingPortal, useMergeRefs } from "@floating-ui/react";
import { useTooltipContext } from "./TooltipContext";

const TooltipContent = React.forwardRef(function TooltipContent(
  props,
  propRef
) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  return (
    <FloatingPortal>
      {context.open && (
        <div
          className={props.className}
          ref={ref}
          style={{
            position: context.strategy,
            top: context.y ?? 0,
            left: context.x ?? 0,
            visibility: context.x == null ? "hidden" : "visible",
            ...props.style,
          }}
          {...context.getFloatingProps(props)}
        ></div>
      )}
    </FloatingPortal>
  );
});

export default TooltipContent;
export { TooltipContent };
