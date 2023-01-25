import * as React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useHover,
  useInteractions,
  useFocus,
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
      <ul>
        <li></li>
        <li>
          <ul>
          </ul>
        </li>
      </ul>
    </FloatingNode>
  );
}

function MenuItem() {
}

function useMenu({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const [activeIndex, setActiveIndex] = React.useState(null);
  const listItemsRef = React.useRef([]);

  const data = useFloating({
    placement: 'bottom-start',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({mainAxis: 1, alignmentAxis: 0}),
      flip(),
      shift(),
    ],
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useHover(context, {
      enabled: true,
    }),
    useRole(context, {role: 'menu'}),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      onNavigate: setActiveIndex,
    }),
  ]);

  const context = data.context;
  const hover = useHover(context, {
    handleClose: safePolygon({restMs: 25}),
    enabled: controlledOpen == null,
    delay: { open: 75 },
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
}
