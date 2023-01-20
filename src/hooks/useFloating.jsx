import * as React from "react";
import * as ReactDOM from "react-dom";
import { computePosition } from "@floating-ui/react";

function useFl(options = {}) {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    whileElementsMounted,
    open,
  } = options;

  const [data, setData] = React.useState({
    x: null,
    y: null,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false,
  });

  const referenceRef = React.useRef(null);
  const floatingRef = React.useRef(null);
  const [reference, _setReference] = React.useState(null);
  const [floating, _setFloating] = React.useState(null);
  const isMountedRef = React.useRef(false);

  const setReference = React.useCallback((node) => {
    if (referenceRef.current != node) {
      console.log("reference assigned");
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);

  const setFloating = React.useCallback((node) => {
    if (floatingRef.current !== node) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);

  const update = React.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    computePosition(referenceRef.current, floatingRef.current, {
      middleware,
      placement,
      strategy,
    }).then((data) => {
      const fulldata = {
        ...data,
        isPositioned: true,
      };
      setData(fulldata);
    });
  }, [placement, strategy]);

  React.useEffect(() => {
    isMountedRef.current = true;
    console.log("app mounted");
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    console.log("the reference and floating change");
    console.log(data);
    if (reference && floating) {
      update();
    }
  }, [reference, floating, update]);

  const refs = {
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating,
  };

  return refs;
}

export { useFl };
