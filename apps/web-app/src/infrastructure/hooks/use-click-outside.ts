import { useRef, useEffect, RefObject } from "react";

export function useClickOutside(callback) {
  const callbackRef = useRef<(args: unknown) => unknown>(null); // initialize mutable ref, which stores callback
  const refs = new Set<RefObject<(args: unknown) => unknown>>([]);
  const addRef = (ref) => {
    if (ref) refs.add(ref);
  };

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    if (callbackRef.current != null) callbackRef.current = callback; // TODO wft?
  });

  useEffect(() => {
    // console.log("useff");
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (
        callbackRef.current &&
        !Array.from(refs).reduce(
          (acc, curr) => curr.contains(e.target) || acc, // TODO wft2
          false
        )
      ) {
        callbackRef.current(e);
      }
    }
  }, [addRef, refs]);

  return addRef;
}
