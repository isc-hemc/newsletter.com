import { DependencyList, useEffect } from 'react';

import { useTimeoutFn } from './useTimeoutFn';

export type UseDebounceReturn = [() => boolean | null, () => void];

/**
 * Hook that delays invoking a function until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param fn - function that will be called.
 * @param ms - delay in milliseconds.
 * @param deps - array of values that the debounce depends on.
 * @returns {UseDebounceReturn} - debounce state and cancel fn.
 */
export const useDebounce = (
  fn: () => void,
  ms = 0,
  deps: DependencyList = [],
): UseDebounceReturn => {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, [...deps, reset]);

  return [isReady, cancel];
};
