import React, { useEffect, useRef, useCallback } from "react";

function Svg({ className, size = 1, color = "black", children }) {
  const svgRef = useRef(null);
  const { current: path } = useRef(children.type().props.children);

  useEffect(() => {
    const box = svgRef.current.getBBox();
    svgRef.current.setAttribute(
      "viewBox",
      [
        Math.round(box.x),
        Math.round(box.y),
        Math.round(box.width),
        Math.round(box.height),
      ].join(" ")
    );
  }, [svgRef]);

  return (
    <svg
      className={className}
      ref={svgRef}
      width={`${size || 1}em`}
      fill={color}
    >
      {path}
    </svg>
  );
}

const SvgRefd = React.forwardRef(
  ({ className, size = 1, color = "black", children, ...props }, ref) => {
    const { current: path } = useRef(children.type().props.children);
    let myRef;
    const cbref = (element) => {
      ref(element);
      myRef = element;
    };

    useEffect(() => {
      if (!myRef) return;
      const box = myRef.getBBox();
      myRef.setAttribute(
        "viewBox",
        [
          Math.round(box.x),
          Math.round(box.y),
          Math.round(box.width),
          Math.round(box.height),
        ].join(" ")
      );
    }, [myRef]);

    return (
      <svg
        className={className}
        ref={cbref}
        width={`${size || 1}em`}
        fill={color}
        {...props}
      >
        {path}
      </svg>
    );
  }
);

export { Svg, SvgRefd };
