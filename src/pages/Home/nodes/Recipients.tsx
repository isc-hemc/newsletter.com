import { FileField, InputField } from 'components/forms';
import { H1, H2 } from 'components/typography';
import { NewsletterContext } from 'contexts';
import { useCallback, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type IBulkPayload = { name: string; csv?: File };

const DEFAULT_VALUES = { csv: undefined, name: '' };

export const RecipientsNode = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const methods = useForm<IBulkPayload>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
  });

  const { t } = useTranslation('page:home');

  const handleOnSubmit = useCallback((v: IBulkPayload) => {
    context?.send('NEXT', v);
  }, []);

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('node.recipients.title')}
      </H1>

      <H2 className="mb-8 text-center">{t('node.recipients.subtitle')}</H2>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          id="newsletter-forms"
          onSubmit={methods.handleSubmit(handleOnSubmit)}
        >
          <InputField
            label={t('form.bulk.name.label', { ns: 'common' })}
            name="name"
            size="md"
          />

          <FileField
            accept=".csv"
            helper={t('form.bulk.csv.helper', { ns: 'common' })}
            icon="csv"
            label={t('form.bulk.csv.label', { ns: 'common' })}
            name="csv"
          />
        </form>
      </FormProvider>
    </>
  );
};
