import { NavLink } from "react-router-dom";

function LinkRouterIndex({ children, ...props }) {
  return (
    <NavLink to="/" {...props}>
      {children}
    </NavLink>
  );
}

export { LinkRouterIndex };
