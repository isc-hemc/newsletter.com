import { cx } from '@emotion/css';
import { useDebounce } from 'hooks';
import fp from 'lodash/fp';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { IPropsOf } from 'types.d';

type IInputBaseProps = Omit<IPropsOf<'input'>, 'onChange' | 'size'>;

/**
 * Enum for input sizes.
 * @readonly
 * @enum {string}
 */
export enum InputSize {
  xs = 'h-8 text-xs',
  sm = 'h-10 text-sm',
  md = 'h-12 text-md',
  lg = 'h-14 text-lg',
  xl = 'h-16 text-xl',
}

export interface IInputProps extends IInputBaseProps {
  /**
   * Debounce interval for `onChange` function, default is `0`.
   */
  debounceInterval?: number;
  /**
   * If `true`, the input will have rounded borders, default is `true`.
   */
  isRounded?: boolean;
  /**
   * On change event handler.
   */
  onChange?: (v: unknown) => void;
  /**
   * Input size, available values are: `xs`, `sm`, `md`, `lg` and `xl`.
   */
  size?: keyof typeof InputSize;
}

export const Input: React.FC<IInputProps> = (props): JSX.Element => {
  const {
    className,
    debounceInterval = 0,
    defaultValue,
    disabled = false,
    isRounded = true,
    name,
    onChange,
    size = 'sm',
    type = 'text',
    value: v,
    ...rest
  } = props;

  const [value, setValue] = useState<
    string | number | readonly string[] | undefined
  >(v || defaultValue);

  const [debounceValue, setDebounceValue] = useState<
    string | number | readonly string[] | undefined
  >();

  useDebounce(
    () => {
      if (onChange && !fp.isNil(debounceValue)) onChange(debounceValue);
    },
    debounceInterval,
    [debounceValue],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setDebounceValue(e?.target?.value);
      setValue(e?.target?.value);
    },
    [],
  );

  const css = useMemo(
    () =>
      cx(
        'border-2 border-gray-200 bg-white px-4 py-2 outline-none w-full focus:outline-none',
        { 'bg-gray-50 cursor-not-allowed opacity-70': disabled },
        { 'rounded-full': isRounded },
        InputSize[size],
        className,
      ),
    [className, disabled, isRounded, size],
  );

  return (
    <input
      className={css}
      disabled={disabled}
      id={name}
      name={name}
      onChange={handleInputChange}
      type={type}
      value={value}
      {...rest}
    />
  );
};
