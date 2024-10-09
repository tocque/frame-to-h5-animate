import { useRef } from "react";

export const useRefFrom = <T>(source: T) => {
  const ref = useRef(source);
  ref.current = source;
  return ref;
}

export const useCurrentFn = <A extends unknown[], R>(fn: (...args: A) => R) => {
  const fnRef = useRefFrom(fn);
  return (...args: A) => fnRef.current(...args);
}
