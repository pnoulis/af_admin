import * as React from "react";

// onPointerDown
// onPointerEnter

function useHover() {
  const [isHover, setIsHover] = React.useState(false);

  return React.useMemo(
    () => [
      isHover,
      {
        onMouseEnter: () => setIsHover(true),
        onMouseLeave: () => setIsHover(false),
      },
    ],
    [isHover, setIsHover]
  );
}

export { useHover };
