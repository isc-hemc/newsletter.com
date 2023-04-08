import { cx } from '@emotion/css';
import { ISelectProps, Select } from 'components/inputs';
import { DefaultTFuncReturn } from 'i18next';
import fp from 'lodash/fp';
import { useController, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '../ErrorMessage';
import { HelperText } from '../HelperText';
import { Label, LabelFontSize } from '../Label';

export interface ISelectFieldProps extends ISelectProps {
  /**
   * Select helper text that will be displayed below the field.
   */
  helper?: DefaultTFuncReturn | string;
  /**
   * Custom tailwind styles for the select component.
   */
  inputClassName?: string;
  /**
   * Select label text.
   */
  label?: DefaultTFuncReturn | string;
  /**
   * Custom tailwind styles for the label tag related to this field.
   */
  labelClassName?: string;
}

export const SelectField: React.FC<ISelectFieldProps> = ({
  className,
  defaultValue,
  helper,
  inputClassName,
  isRounded = true,
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
      {!fp.isNil(label) ? (
        <Label
          className={cx(LabelFontSize[size], labelClassName)}
          htmlFor={name}
        >
          {label}
        </Label>
      ) : null}

      <Select
        className={inputClassName}
        id={name}
        isRounded={isRounded}
        size={size}
        {...rest}
        {...field}
      />

      <HelperText>{helper}</HelperText>

      <ErrorMessage>{fieldState?.error?.message}</ErrorMessage>
    </div>
  );
};
