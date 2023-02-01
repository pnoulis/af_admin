import * as React from "react";
import styled from 'styled-components';
import { inlineStyle } from '/src/lib';

/*
  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
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

function InfiniteScroll() {
  return 0;
}

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
  const rootRef = React.useRef(null);
  const targetRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => listener(entries[0].isIntersecting),
      {
        root: rootRef.current,
        rootMargin: `${config.offset}px`,
        threshold: 1,
      }
    );
    const observerTarget = document.createElement("span");
    if (config.reverse) {
      targetRef.current.prepend(observerTarget);
    } else {
      observerTarget.setAttribute('style', inlineStyle({
        position: 'absolute',
        bottom: 0,
      }));
      targetRef.current.setAttribute('style', inlineStyle({
        position: 'relative',
      }));
      targetRef.current.appendChild(observerTarget);
    }
    observer.observe(observerTarget);
    return () => {
      observer.unobserve(observerTarget);
      targetRef.current.removeChild(observerTarget);
    };
  }, [config]);

  return {
    refs: {
      setRoot: (node) => (rootRef.current = node),
      setTarget: (node) => (targetRef.current = node),
    },
  };
}

function useInfiniteScrolling(config, listener) {
  const rootRef = React.useRef(null);
  const targetRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => listener(
        entry.isIntersecting, entry.target.className)),
      {
        root: rootRef.current,
        rootMargin: `${config.offset || 0}px`,
        threshold: config.threshold || 1,
      }
    );
    const targets = [document.createElement('span')];
    targetRef.current.style.position = 'relative';
    switch (config.direction) {
    case 'updown':
      targets.push(document.createElement('span'));
      targets[0].setAttribute('style', inlineStyle({
        position: 'absolute',
        top: 0,
      }));
      targets[0].className = 'infinite-scroll-up';
      targets[1].setAttribute('style', inlineStyle({
        position: 'absolute',
        bottom: 0,
      }));
      targets[1].className = 'infinite-scroll-down';
      break;
    case 'up':
      targets[0].setAttribute('style', inlineStyle({
        position: 'absolute',
        top: 0,
      }));
      targets[0].className = 'infinite-scroll-up';
      break;
    default:
      targets[0].setAttribute('style', inlineStyle({
        position: 'absolute',
        bottom: 0,
      }));
      targets[0].className = 'infinite-scroll-down';
      break;
    }
    targets.forEach((target) => {
      targetRef.current.appendChild(target);
      observer.observe(target);
    });
    return () => {
      targets.forEach((target) => {
        observer.unobserve(target);
        targetRef.current.removeChild(target);
      });
    };
  }, []);

  return {
    setRoot: (node) => rootRef.current = node,
    setTarget: (node) => targetRef.current = node
  };
}

const Container = styled.div`
background-color: green;
height: 300px;
width: 100%;
overflow: scroll;

.content {
height: calc(100% + 100%);
background-color: yellow;
width: 200px;
margin: auto;
}
`;

function TestInfiniteScroll() {
  const { setRoot, setTarget } = useInfiniteScrolling({
    offset: 50,
    direction: 'updown',
  }, (direction, isObserved) => {
    console.log(`direction:${direction}`);
    console.log(`observed:${isObserved}`);
  });

  return (
    <Container ref={setRoot}>
      <div ref={setTarget} className='content'>
      </div>
    </Container>
  );

}

export { TestInfiniteScroll };
