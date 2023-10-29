import { useRef, useEffect } from "react";

export function useClickOutside(callback) {
  const callbackRef = useRef<(args: unknown) => unknown>(); // initialize mutable ref, which stores callback
  const refs = new Set([]);
  const addRef = (ref) => {
    if (ref) refs.add(ref);
  };

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    // console.log("useff");
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (
        callbackRef.current &&
        !Array.from(refs).reduce(
          (acc, curr) => curr.contains(e.target) || acc,
          false
        )
      ) {
        callbackRef.current(e);
      }
    }
  }, [addRef, refs]);

  return addRef;
}
