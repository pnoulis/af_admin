import * as React from "react";
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

function MenuComponent2({ children }) {
  return (
    <FloatingNode>
      <li>
        <span></span>
        <ul>
          {React.Children.map(
            children,
            (child, index) =>
              React.isValidElement(child) &&
              React.cloneElement(
                child,
                getItemProps({
                  tabIndex: activeIndex === index ? 0 : -1,
                  role: "menuitem",
                  className: "MenuItem",
                  ref(node) {
                    listItemsRef.current[index] = node;
                  },
                  onClick(event) {
                    child.props.onClick?.(event);
                    tree?.events.emit("click");
                  },
                  onMouseEnter() {
                    if (allowHover && open) {
                      setActiveIndex(index);
                    }
                  },
                })
              )
          )}
        </ul>
      </li>
    </FloatingNode>
  );
}
