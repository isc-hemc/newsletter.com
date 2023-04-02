/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

/**
 * Calls given function after specified amount of milliseconds.
 * @param fn - function that will be called.
 * @param ms - delay in milliseconds.
 * @returns {UseTimeoutFnReturn} - current state, cancel fn and reset fn.
 */
export const useTimeoutFn = (fn: () => any, ms = 0): UseTimeoutFnReturn => {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  useEffect(() => {
    set();

    return clear;
  }, [clear, ms, set]);

  return [isReady, clear, set];
};
