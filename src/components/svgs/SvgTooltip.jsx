import { SvgButton } from "./SvgButton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "/src/components/tooltips";

function SvgTooltip({
  className,
  title,
  placement,
  size,
  svgSize,
  children,
  ...props
}) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <SvgButton
          className={className}
          size={size}
          svgSize={svgSize}
          {...props}
        >
          {children}
        </SvgButton>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}

export { SvgTooltip };
