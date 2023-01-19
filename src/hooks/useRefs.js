import * as React from "react";

/*
  @param { refs = []}

  @return Function -> callback reference

  About:
  --------------------------------------------------
  useRefs implements the *callback reference* pattern.
  It makes it possible to have multiple references to a
  DOM element by transfering control over the assignment
  of the DOM element to the variables from react to the user.

  Normally one links a reference variable to a DOM element
  like so:

  const reference = useRef(null);
  <button ref={reference}/>

  This approach handles control over the linking to react.
  Meaning that it is react which will link the DOM element
  to the reference. The user has no control over when or how.

  More critical though is the fact that the user cannot declare
  multiple references to the DOM element for react to assign.

  One of the usages of the *callback reference* pattern is to
  allow developers to have multiple references to the same DOM
  element.

  The *callback reference* pattern is implemented like so:

  const reference_1 = useRef(null);
  const reference_2 = useRef(null);
  const callbackReference = (DOM_ELEMENT) => {
  reference_1.current = DOM_ELEMENT
  reference_2.current = DOM_ELEMENT
  }

  <button ref={callbackReference}/>

 */

function useRefs(refs = []) {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }, refs);
}
