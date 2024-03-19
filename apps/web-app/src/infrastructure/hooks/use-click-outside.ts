import { useRef, useEffect, RefObject } from "react";

export function useClickOutside(callback) {
  const callbackRef = useRef<(args: unknown) => unknown>(null); // initialize mutable ref, which stores callback
  const refs = new Set<RefObject<(args: unknown) => unknown>>([]);
  const addRef = (ref) => {
    if (ref) refs.add(ref);
  };

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    (callbackRef.current as any) = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (
        callbackRef.current &&
        !Array.from(refs).reduce(
          (acc, curr) => (curr as any).contains(e.target) || acc,
          false
        )
      ) {
        callbackRef.current(e);
      }
    }
  }, [addRef, refs]);

  return addRef;
}
