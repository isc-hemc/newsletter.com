import { FileField, InputField, SelectField } from 'components/forms';
import { H1, H2 } from 'components/typography';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const DEFAULT_VALUES = {
  attachment: undefined,
  bulk_id: '',
  subject: '',
  template_id: '',
};

type IBuilderPayload = {
  attachment?: File;
  bulk_id?: string;
  subject: string;
  template_id?: string;
};

export const BuilderScreen = (): JSX.Element => {
  const methods = useForm<IBuilderPayload>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
  });

  const { t } = useTranslation('page:home');

  const handleOnSubmit = useCallback((v: IBuilderPayload) => {
    // eslint-disable-next-line no-console
    console.log(v);
  }, []);

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('screen.builder.title')}
      </H1>

      <H2 className="mb-8 text-center">{t('screen.builder.subtitle')}</H2>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          id="newsletter-forms"
          onSubmit={methods.handleSubmit(handleOnSubmit)}
        >
          <InputField
            label={t('screen.builder.subject.label')}
            name="subject"
            size="md"
          />

          <SelectField
            helper={t('screen.builder.template.helper')}
            label={t('screen.builder.template.label')}
            name="template_id"
            options={[]}
            placeholder={t('screen.builder.template.placeholder')}
            size="md"
          />

          <SelectField
            helper={t('screen.builder.recipients.helper')}
            label={t('screen.builder.recipients.label')}
            name="bulk_id"
            options={[]}
            placeholder={t('screen.builder.recipients.placeholder')}
            size="md"
          />

          <FileField
            accept=".png,.pdf"
            helper={t('screen.builder.attachment.helper')}
            icon="img"
            label={t('screen.builder.attachment.label')}
            name="attachment"
          />
        </form>
      </FormProvider>
    </>
  );
};
