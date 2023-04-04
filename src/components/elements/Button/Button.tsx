/* eslint-disable react/button-has-type */
import { css, cx } from '@emotion/css';
import theme from 'assets/js/theme';
import { useMemo } from 'react';
import colors from 'tailwindcss/colors';
import { IPropsOf } from 'types.d';

const THEME = { ...colors, ...theme?.extend?.colors };

export interface IButtonProps extends IPropsOf<'button'> {
  /**
   * Theme color defined on tailwind.config.ts, default is `primary`.
   */
  colorScheme?: string;
  /**
   * Icon that will be rendered on the left side of the button's content.
   */
  leftIcon?: React.ReactElement;
  /**
   * Icon that will be rendered on the right side of the button's content.
   */
  rightIcon?: React.ReactElement;
  /**
   * Button type, default is `button`.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Button variant, default it `solid`.
   */
  variant?: 'solid' | 'outline' | 'link';
}

export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  colorScheme = 'primary',
  disabled,
  leftIcon,
  rightIcon,
  type = 'button',
  variant = 'solid',
  ...rest
}): JSX.Element => {
  const scheme = useMemo(() => THEME?.[colorScheme], [colorScheme]);

  return (
    <button
      className={cx(
        'flex items-center justify-center gap-1 self-start rounded-full font-semibold !outline-0 transition-all duration-300 ease-in-out',
        { 'cursor-not-allowed opacity-50': disabled },
        variant === 'solid' &&
          css`
            background: ${scheme?.[500]};
            color: white;

            &:hover {
              background: ${scheme?.[700]};
            }

            &:active {
              background: ${scheme?.[800]};
            }
          `,
        variant === 'outline' &&
          css`
            border-color: ${scheme?.[500]};
            border-width: 2px;
            color: ${scheme?.[500]};

            &:hover {
              border-color: ${scheme?.[700]};
              color: ${scheme?.[700]};
            }

            &:active {
              border-color: ${scheme?.[800]};
              color: ${scheme?.[800]};
            }
          `,
        variant === 'link' &&
          css`
            color: ${scheme?.[500]};

            &:hover {
              color: ${scheme?.[700]};
              transform: scale(1.05);
            }

            &:active {
              color: ${scheme?.[800]};
              transform: scale(1);
            }
          `,
        className,
      )}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {leftIcon || null}
      {children}
      {rightIcon || null}
    </button>
  );
};
