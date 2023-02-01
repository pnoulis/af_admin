import * as React from "react";

/*
  https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
  https://web.dev/patterns/web-vitals-patterns/infinite-scroll/

 */
const InfiniteScrollContext = React.createContext(null);
const useInfiniteScrollContext = () => {
  const context = React.useContext(InfiniteScrollContext);
  if (context == null) {
    throw new Error(
      "InfiniteScroll children components must be wrapped in <InfiniteScroll/>"
    );
  }
  return context;
};

function InfiniteScroll() {}

function InfiniteScrollObserverTarget({ onObserved = () => {}, ...config }) {
  const context = useInfiniteScrollContext();
  const targetRef = React.useRef(null);

  React.useEffect(() => {
    context.observe(targetRef, onObserved);
    return () => context.unobserve(targetRef);
  }, []);

  return <div ref={targetRef}></div>;
}

function useBiInfiniteScroll() {}
function useUniInfiniteScroll(config, listener) {
  const observer = React.useRef(null);
  const rootRef = React.useRef(null);
  const targetRef = React.useRef(null);

  React.useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => listener(entries[0].isIntersecting),
      {
        root: rootRef.current,
        rootMargin: config.offset,
        threshold: 1,
      }
    );
    const observerTarget = document.createElement("span");
    targetRef.current.appendChild(observerTarget);
    observer.observe(observerTarget);
    return () => observer.current.unobserve(observerTarget);
  }, []);

  return {
    refs: {
      setRoot: (node) => (rootRef.current = node),
      setTarget: (node) => (targetRef.current = node),
    },
  };
}
