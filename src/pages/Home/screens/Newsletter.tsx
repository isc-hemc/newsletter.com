import { FileField, InputField } from 'components/forms';
import { H1, H2 } from 'components/typography';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const DEFAULT_VALUES = { attachment: undefined, name: '', template_id: '' };

type INewsletterPayload = {
  subject: string;
  template_id?: string;
  attachment?: File;
};

export const NewsletterScreen = (): JSX.Element => {
  const methods = useForm<INewsletterPayload>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
  });

  const { t } = useTranslation('page:home');

  const handleOnSubmit = useCallback((v: INewsletterPayload) => {
    // eslint-disable-next-line no-console
    console.log(v);
  }, []);

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('screen.newsletter.title')}
      </H1>

      <H2 className="mb-8 text-center">{t('screen.newsletter.subtitle')}</H2>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(handleOnSubmit)}
        >
          <InputField
            label={t('form.newsletter.name.label', { ns: 'common' })}
            name="subject"
            size="md"
          />

          <FileField
            accept=".png,.pdf"
            helper={t('form.newsletter.attachment.helper', { ns: 'common' })}
            icon="img"
            label={t('form.newsletter.attachment.label', { ns: 'common' })}
            name="attachment"
          />
        </form>
      </FormProvider>
    </>
  );
};
