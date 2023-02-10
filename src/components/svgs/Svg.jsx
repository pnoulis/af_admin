import * as React from "react";

const Svg = React.forwardRef(
  ({ className, size, color = "black", children, ...props }, ref) => {
    const { current: path } = React.useRef(children.type().props.children);
    let myRef;
    const cbref = (element) => {
      ref && ref(element);
      myRef = element;
    };

    React.useEffect(() => {
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
        width={size || '100%'}
        height={size || '100%'}
        fill={color}
        {...props}
      >
        {path}
      </svg>
    );
  }
);

export { Svg };
