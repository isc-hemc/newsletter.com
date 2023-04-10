import { cx } from '@emotion/css';
import { DefaultTFuncReturn } from 'i18next';
import { useController, useFormContext } from 'react-hook-form';
import { IPropsOf } from 'types.d';

import { ErrorMessage } from '../ErrorMessage';
import { HelperText } from '../HelperText';
import { Label, LabelFontSize } from '../Label';

/**
 * Enum for checkbox sizes.
 * @readonly
 * @enum {string}
 */
export enum CheckboxSize {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export interface ICheckboxFieldProps extends IPropsOf<'input'> {
  /**
   * Checkbox helper text that will be displayed below the input.
   */
  helper?: DefaultTFuncReturn | string;
  /**
   * Checkbox label text.
   */
  label: DefaultTFuncReturn | string;
  /**
   * Custom tailwind styles for the label tag related to this input.
   */
  labelClassName?: string;
  /**
   * Checkbox size, available values are: `xs`, `sm`, `md`, `lg` and `xl`.
   */
  size?: keyof typeof CheckboxSize;
}

export const CheckboxField: React.FC<ICheckboxFieldProps> = ({
  className,
  defaultValue,
  helper,
  label,
  labelClassName,
  name,
  size = 'sm',
  ...rest
}): JSX.Element => {
  const { control } = useFormContext();

  const { field, fieldState } = useController({ control, defaultValue, name });

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <div className="flex gap-2">
        <input
          defaultChecked={field.value}
          type="checkbox"
          {...rest}
          {...field}
        />
        <Label
          className={cx(LabelFontSize[size], labelClassName)}
          htmlFor={name}
        >
          {label}
        </Label>
      </div>

      <HelperText>{helper}</HelperText>

      <ErrorMessage>{fieldState?.error?.message}</ErrorMessage>
    </div>
  );
};
