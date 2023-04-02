// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type As<Props = any> = ElementType<Props>;

/**
 * Extract the props of a React element or component
 */
export type IPropsOf<T extends As> = ComponentPropsWithoutRef<T> & {
  /**
   * React element component.
   */
  as?: As;
  /**
   * Custom CSS tailwind styles.
   */
  className?: string;
};
