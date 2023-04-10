import { clomp } from 'clomp';
import { Button } from 'components/elements';
import { CheckboxField } from 'components/forms';
import { nanoid } from 'nanoid';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IPropsOf } from 'types.d';

const F = clomp.form`
  grid
  grid-cols-2
  gap-2
  rounded-xl
  border-2
  border-gray-200
  bg-white
  p-8
  lg:grid-cols-4
  lg:justify-items-center
`;

export type IFormValue = { [k: string]: boolean };

export interface IFormProps extends IPropsOf<'form'> {
  /**
   * Form default values.
   */
  defaultValues?: IFormValue;
  /**
   * Action triggered on submit events.
   */
  onSubmit: (v: IFormValue) => Promise<void>;
  /**
   * Options that will be rendered in order that the user can check or uncheck
   * them. Each element will construct a checkbox field and must be structured
   * as it follows: `{ id: string; label: string; value: boolean }`.
   */
  options?: { [k: string]: boolean | string | undefined }[];
}

export const Form: React.FC<IFormProps> = ({
  defaultValues,
  options,
  onSubmit,
  ...rest
}): JSX.Element => {
  const { formState, ...methods } = useForm<IFormValue>({
    defaultValues,
    mode: 'all',
  });

  const { t } = useTranslation('common');

  return (
    <FormProvider formState={formState} {...methods}>
      <F id="form" onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {options?.map(({ id, label }) => (
          <CheckboxField key={nanoid()} label={label as string} name={id} />
        ))}
      </F>

      <Button
        className="mt-4 self-center px-8 py-2 text-sm"
        colorScheme="tertiary"
        disabled={formState?.isSubmitting || !formState?.isDirty}
        form="form"
        type="submit"
      >
        {t('button.save')}
      </Button>
    </FormProvider>
  );
};
