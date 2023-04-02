import { useCallback, useEffect } from 'react';

/**
 * Hook that triggers a callback when user clicks outside the target element.
 * @param element - target HTML element.
 * @param handler - action to trigger when a click outside the element is detected.
 */
export const useClickAway = (
  element: React.RefObject<HTMLDivElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void => {
  const listener = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        !element?.current ||
        element?.current?.contains(event?.target as Node)
      )
        return;
      handler(event);
    },
    [element, handler],
  );

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [element]);
};
