import { SvgButton } from "./SvgButton";
import { Tooltip } from "@mui/material";

function SvgTooltip({ className, size, children }) {
  return (
    <Tooltip title="add" arrow>
      <SvgButton className={className} size={size}>
        {children}
      </SvgButton>
    </Tooltip>
  );
}

export { SvgTooltip };
