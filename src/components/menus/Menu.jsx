import * as React from "react";
import MenuItem from "./MenuItem";
import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useHover,
  useInteractions,
  useRole,
  useTypeahead,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useMergeRefs,
  FloatingNode,
  FloatingTree,
  FloatingFocusManager,
} from "@floating-ui/react";

const MenuComponent = React.forwardRef(
  ({ children, label, ...props }, forwardRef) => {
    const [open, setOpen] = React.useState(false);
  }
);

function Menu() {
  return (
    <div>
      <p>menu</p>
    </div>
  );
}

export default Menu;
export { Menu };
