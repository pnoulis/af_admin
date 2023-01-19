import { SvgButton } from "./SvgButton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "/src/components/tooltips";

function SvgTooltip({ className, title, placement, size, children }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <SvgButton className={className} size={size}>
          {children}
        </SvgButton>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}

export { SvgTooltip };
