import TooltipContext from "./TooltipContext";
import useTooltip from "./useTooltip";

function Tooltip({ children, ...options }) {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

export default Tooltip;
export { Tooltip };
