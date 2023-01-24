import * as React from "react";

const MenuItem = React.forwardRef(({ label, disabled, ...props }, ref) => {
  return (
    <button {...props} ref={ref} role="menuitem" disabled={disabled}>
      {label}
    </button>
  );
});

export default MenuItem;
export { MenuItem };
