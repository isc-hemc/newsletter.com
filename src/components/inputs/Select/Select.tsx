/* eslint-disable @typescript-eslint/no-explicit-any */
import fp from 'lodash/fp';
import { useCallback, useMemo } from 'react';
import ReactSelect, { GroupBase, MultiValue, SingleValue } from 'react-select';
import { IPropsOf } from 'types.d';

/**
 * Select's value type.
 */
type ISelectValue =
  | SingleValue<string | number | GroupBase<string | number>>
  | MultiValue<string | number | GroupBase<string | number>>;

/**
 * Enum for select's inner font size.
 * @readonly
 * @enum {string}
 */
enum SelectFontSize {
  xs = '0.75rem',
  sm = '0.875rem',
  md = '1rem',
  lg = '1.125rem',
  xl = '1.25rem',
}

/**
 * Enum for select's size.
 * @readonly
 * @enum {string}
 */
export enum SelectSize {
  xs = '32px',
  sm = '40px',
  md = '48px',
  lg = '56px',
  xl = '64px',
}

/**
 * Select's base props.
 */
type ISelectBaseProps = Omit<
  IPropsOf<'select'>,
  'defaultValue' | 'onChange' | 'size' | 'value'
>;

export interface ISelectProps extends ISelectBaseProps {
  /**
   * Select's default value.
   */
  defaultValue?: ISelectValue;
  /**
   * If `true`, it will display a loading helper.
   */
  isLoading?: boolean;
  /**
   * If `true`, the field will have rounded borders.
   */
  isRounded?: boolean;
  /**
   * On change event handler.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (v: any) => void;
  /**
   * Select options.
   */
  options?: { label: string; value: number | string }[];
  /**
   * Select size, available values are: `xs`, `sm`, `md`, `lg` and `xl`.
   */
  size?: keyof typeof SelectSize;
  /**
   * Current select value.
   */
  value?: ISelectValue;
}

export const Select: React.FC<ISelectProps> = ({
  defaultValue,
  disabled,
  isLoading,
  isRounded,
  onChange,
  options,
  size = 'sm',
  value,
  ...rest
}): JSX.Element => {
  const handleOnChange = useCallback(
    (o: SingleValue<{ label: string; value: string | number }>) => {
      const aux = fp.get('value')(o);
      if (!fp.isNil(onChange)) onChange(aux);
    },
    [],
  );

  const handleGetValue = useCallback(
    (v?: ISelectValue) => {
      if (!fp.isEmpty(options) && !fp.isNil(v)) {
        return options?.find((opt) => fp.get('value')(opt) === v);
      }
      return undefined;
    },
    [options],
  );

  const CUSTOM_STYLES = useMemo(
    () => ({
      control: (base: any) => ({
        ...base,
        background: 'white',
        border: '2 solid #E5E7EB',
        borderRadius: isRounded ? 50 : 0,
        fontSize: SelectFontSize[size],
        minHeight: SelectSize[size],
      }),
      menu: (base: any) => ({
        ...base,
        fontSize: SelectFontSize[size],
      }),
      option: (base: any) => ({
        ...base,
        fontSize: SelectFontSize[size],
      }),

      // valueContainer: (base: any) => ({
      //   ...base,
      //   position: size === 'sm' ? 'static' : 'relative',
      // }),
    }),
    [isRounded, size],
  );

  return (
    <ReactSelect
      isDisabled={disabled || isLoading}
      isLoading={isLoading}
      onChange={handleOnChange}
      options={options}
      styles={CUSTOM_STYLES}
      value={handleGetValue(value || defaultValue)}
      {...rest}
    />
  );
};
