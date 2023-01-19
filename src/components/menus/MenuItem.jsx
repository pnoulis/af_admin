import * as React from "react";

const MenuItem = React.forwardRef(
  ({ children, label, disabled = false, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ...children.props,
        ref,
        role: "menuitem",
        disabled,
      });
    }

    return (
      <button {...props} ref={ref} role="menuitem" disabled={disabled}>
        {label}
      </button>
    );
  }
);

export default MenuItem;
export { MenuItem };
