import { yupResolver } from '@hookform/resolvers/yup';
import { QuerySuggestions } from 'components/elements';
import { FileField, InputField, SelectField } from 'components/forms';
import { H1, H2 } from 'components/typography';
import { NewsletterContext } from 'contexts';
import fp from 'lodash/fp';
import { useCallback, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  INewsletterPayload,
  NewsletterTypeResources as NTR,
} from 'services/resources';
import {
  isValidFileFormat,
  isValidFileSize,
  PDF_FORMAT,
  PNG_FORMAT,
} from 'utils';
import * as Yup from 'yup';

const VALIDATION_SCHEMA = Yup.object().shape({
  attachment: Yup.mixed()
    .test('file-size', 'form.file-size', (v) => {
      if (fp.isNil(v) || fp.isString(v)) return true;
      return fp.compose(isValidFileSize, fp.get('size'))(v);
    })
    .test('file-format', 'form.file-format', (v) => {
      if (fp.isNil(v) || fp.isString(v)) return true;
      return fp.compose(
        isValidFileFormat([PDF_FORMAT, PNG_FORMAT]),
        fp.get('type'),
      )(v);
    }),

  newsletter_type_id: Yup.string().required('form.required'),

  subject: Yup.string().required('form.required'),
});

const DEFAULT_VALUES: INewsletterPayload = {
  attachment: undefined,
  newsletter_type_id: undefined,
  subject: '',
  template_id: undefined,
};

export const NewsletterNode = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const methods = useForm<INewsletterPayload>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const { t } = useTranslation('page:home');

  const handleOnSubmit = useCallback((v: INewsletterPayload) => {
    context?.send('NEXT', v);
  }, []);

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('node.newsletter.title')}
      </H1>

      <H2 className="mb-8 text-center">{t('node.newsletter.subtitle')}</H2>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          id="newsletter-forms"
          onSubmit={methods.handleSubmit(handleOnSubmit)}
        >
          <InputField
            label={t('form.newsletter.subject.label', { ns: 'common' })}
            name="subject"
            size="md"
          />

          <QuerySuggestions query={NTR.fetch} queryKey="fetch-newsletter-types">
            {({ data, isLoading }) => (
              <SelectField
                isLoading={isLoading}
                label={t('form.newsletter.type.label', { ns: 'common' })}
                name="newsletter_type_id"
                options={data?.results?.map(({ id: value, name: label }) => ({
                  label,
                  value,
                }))}
                placeholder={t('form.newsletter.type.placeholder', {
                  ns: 'common',
                })}
                size="md"
              />
            )}
          </QuerySuggestions>

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
