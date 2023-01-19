import * as React from "react";

const TooltipContext = React.createContext();

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);
  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }
  return context;
};

export default TooltipContext;
export { useTooltipContext, TooltipContext };
