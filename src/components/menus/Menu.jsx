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
  ({ children, label, ...props }, menuComponentRef) => {
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(null);
    const [allowHover, setAllowHover] = React.useState(false);

    const listItemsRef = React.useRef([]);
    const listContentRef = React.useRef(
      React.Children.map(children, (child) =>
        React.isValidElement(child) ? child.props.label : null
      )
    );

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const nested = parentId != null;

    const { x, y, strategy, refs, context } = useFloating({
      open,
      nodeId,
      onOpenChange: setOpen,
      placement: nested ? "right-start" : "bottom-start",
      middleware: [
        offset({ mainAxis: 4, alignmentAxis: nested ? -5 : 0 }),
        flip(),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([
        useHover(context, {
          handleCLose: safePolygon({ restMs: 25 }),
          enabled: nested && allowHover,
          delay: { open: 75 },
        }),

        useClick(context, {
          toggle: !nested || !allowHover,
          event: "mousedown",
          ignoreMouse: nested,
        }),

        useRole(context, { role: "menu" }),
        useDismiss(context),
        useListNavigation(context, {
          listRef: listItemsRef,
          activeIndex,
          nested,
          onNavigate: setActiveIndex,
        }),
        useTypeahead(context, {
          listRef: listContentRef,
          onMatch: open ? setActiveIndex : undefined,
          activeIndex,
        }),
      ]);

    React.useEffect(() => {
      function handleTreeClick() {
        setOpen(false);
      }

      function onSubMenuOpen(event) {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setOpen(false);
        }
      }

      tree?.events.on("click", handleTreeClick);
      tree?.events.on("menuopen", onSubMenuOpen);

      return () => {
        tree?.events.off("click", handleTreeClick);
        tree?.events.off("menuopen", onSubMenuOpen);
      };
    }, [tree, nodeId, parentId]);

    React.useEffect(() => {
      if (open) {
        tree?.events.emit("menuopen", {
          parentId,
          nodeId,
        });
      }
    }, [tree, open, nodeId, parentId]);
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
