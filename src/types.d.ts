import { IconType } from 'react-icons';

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

export interface INavigationItem {
  /**
   * Icon that will be rendered on the left side of the navigation item.
   */
  icon: IconType;
  /**
   * Label that will describe the navigation item.
   */
  label: string;
  /**
   * Route to redirect on click events.
   */
  to: string;
}
