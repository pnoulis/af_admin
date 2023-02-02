import * as React from "react";
import { inlineStyle } from "/src/lib";

/*
  What is infinite scrolling:
  https://web.dev/patterns/web-vitals-patterns/infinite-scroll/

  Infinite scrolling is implemented with the help of the Intersection Observer API:
  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API


  USAGE:

  function SomeScrollableComponent() {
  const [data, setData] = useState([]);
  const { setRoot, setTarget } = useInfiniteScrolling(
    {offset: 20},
    (isObserved, direction) => {
        fetchData().then(setData((prev) => prev.push(newData)));
    }
  )

  return (
  <div ref={setRoot}>
     <ul ref{setTarget}>
         {data.map((item) => <li>{item}</li>)}
     </ul>
  </div>
  );
  }

  The root element is the scroll container. where:
  scrollContainer.overflow = scroll;

  The target element is the list of items to infinitely scroll where:
  targetElement.position = relative;

 */

function useInfiniteScrolling(config = {}, listener = () => {}) {
  const rootRef = React.useRef(null);
  const targetRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          listener(entry.isIntersecting, entry.target.className)
        ),
      {
        root: rootRef.current,
        rootMargin: `${config.offset || 0}px`,
        threshold: config.threshold || 1,
      }
    );
    const targets = [document.createElement("span")];
    targetRef.current.style.position = "relative";
    switch (config.direction) {
      case "updown":
        targets.push(document.createElement("span"));
        targets[0].setAttribute(
          "style",
          inlineStyle({
            position: "absolute",
            top: 0,
          })
        );
        targets[0].className = "infinite-scroll-up";
        targets[1].setAttribute(
          "style",
          inlineStyle({
            position: "absolute",
            bottom: 0,
          })
        );
        targets[1].className = "infinite-scroll-down";
        break;
      case "up":
        targets[0].setAttribute(
          "style",
          inlineStyle({
            position: "absolute",
            top: 0,
          })
        );
        targets[0].className = "infinite-scroll-up";
        break;
      default:
        targets[0].setAttribute(
          "style",
          inlineStyle({
            position: "absolute",
            bottom: 0,
          })
        );
        targets[0].className = "infinite-scroll-down";
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
    setRoot: (node) => (rootRef.current = node),
    setTarget: (node) => (targetRef.current = node),
  };
}

export default useInfiniteScrolling;
export { useInfiniteScrolling };
