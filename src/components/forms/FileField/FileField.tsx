import { cx } from '@emotion/css';
import { FileInput, IFileInputProps } from 'components/inputs';
import { DefaultTFuncReturn } from 'i18next';
import fp from 'lodash/fp';
import { useController, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '../ErrorMessage';
import { HelperText } from '../HelperText';
import { Label } from '../Label';

export interface IFileFieldProps extends IFileInputProps {
  /**
   * Helper text that will be displayed below the input.
   */
  helper?: DefaultTFuncReturn | string;
  /**
   * Custom tailwind styles for the input, in this case the dnd-container.
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

export const FileField: React.FC<IFileFieldProps> = ({
  className,
  defaultValue,
  helper,
  inputClassName,
  label,
  labelClassName,
  name,
  ...rest
}): JSX.Element => {
  const { control } = useFormContext();

  const { field, fieldState } = useController({ control, defaultValue, name });

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      {!fp.isNil(label) ? (
        <Label className={labelClassName} htmlFor={name}>
          {label}
        </Label>
      ) : null}

      <FileInput className={inputClassName} {...rest} {...field} />

      <HelperText>{helper}</HelperText>

      <ErrorMessage>{fieldState?.error?.message}</ErrorMessage>
    </div>
  );
};
