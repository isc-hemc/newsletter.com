import { cx } from '@emotion/css';
import { useDebounce } from 'hooks';
import fp from 'lodash/fp';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { IPropsOf } from 'types.d';

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

export interface IInputProps
  extends Omit<IPropsOf<'input'>, 'onChange' | 'size'> {
  /**
   * Debounce interval for `onChange` function, default is `0`.
   */
  debounceInterval?: number;
  /**
   * If `true`, this field will be disabled, default is `false`.
   */
  isDisabled?: boolean;
  /**
   * If `true`, this field will be required by the form, default is `false`.
   */
  isRequired?: boolean;
  /**
   * If `true`, the input will have rounded borders, default is `true`.
   */
  isRounded?: boolean;
  /**
   * On change event handler.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (v: any) => void;
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
    isDisabled = false,
    isRequired = false,
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
        { 'bg-gray-50 cursor-not-allowed opacity-70': isDisabled },
        { 'rounded-full': isRounded },
        InputSize[size],
        className,
      ),
    [className, isDisabled, isRounded, size],
  );

  return (
    <input
      className={css}
      disabled={isDisabled}
      id={name}
      name={name}
      onChange={handleInputChange}
      required={isRequired}
      type={type}
      value={value}
      {...rest}
    />
  );
};
