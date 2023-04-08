import { cx } from '@emotion/css';
import { IInputProps, Input } from 'components/inputs';
import { DefaultTFuncReturn } from 'i18next';
import fp from 'lodash/fp';
import { useController, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '../ErrorMessage';
import { HelperText } from '../HelperText';
import { Label, LabelFontSize } from '../Label';

export interface IInputFieldProps extends IInputProps {
  /**
   * Input helper text that will be displayed below the input.
   */
  helper?: DefaultTFuncReturn | string;
  /**
   * Custom tailwind styles for the input tag.
   */
  inputClassName?: string;
  /**
   * Input label text.
   */
  label?: DefaultTFuncReturn | string;
  /**
   * Custom tailwind styles for the label tag related to this input.
   */
  labelClassName?: string;
}

export const InputField: React.FC<IInputFieldProps> = ({
  autoComplete = 'off',
  className,
  debounceInterval = 0,
  defaultValue,
  helper,
  inputClassName,
  isRounded = true,
  label,
  labelClassName,
  name,
  placeholder,
  size = 'sm',
  type = 'text',
}): JSX.Element => {
  const { control } = useFormContext();

  const { field, fieldState } = useController({ control, defaultValue, name });

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      {!fp.isNil(label) ? (
        <Label
          className={cx(LabelFontSize[size], labelClassName)}
          htmlFor={name}
        >
          {label}
        </Label>
      ) : null}

      <Input
        autoComplete={autoComplete}
        className={inputClassName}
        debounceInterval={debounceInterval}
        id={name}
        isRounded={isRounded}
        placeholder={placeholder}
        size={size}
        type={type}
        {...field}
      />

      <HelperText>{helper}</HelperText>

      <ErrorMessage>{fieldState?.error?.message}</ErrorMessage>
    </div>
  );
};
