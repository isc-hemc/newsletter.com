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
  BulkResources as BR,
  TemplateResources as TR,
} from 'services/resources';
import {
  isValidFileFormat,
  isValidFileSize,
  PDF_FORMAT,
  PNG_FORMAT,
} from 'utils';
import * as Yup from 'yup';

type IBuilderPayload = {
  attachment?: File;
  bulk_id?: string;
  subject: string;
  template_id?: string;
};

const DEFAULT_VALUES: IBuilderPayload = {
  attachment: undefined,
  bulk_id: '',
  subject: '',
  template_id: '',
};

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

  bulk_id: Yup.string().nullable(),

  subject: Yup.string().required('form.required'),

  template_id: Yup.string().nullable(),
});

export const BuilderNode = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const methods = useForm<IBuilderPayload>({
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const { t } = useTranslation('page:home');

  const handleOnSubmit = useCallback((v: IBuilderPayload) => {
    context?.send('NEXT', v);
  }, []);

  return (
    <>
      <H1 className="mb-2 text-center uppercase">{t('node.builder.title')}</H1>

      <H2 className="mb-8 text-center">{t('node.builder.subtitle')}</H2>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          id="newsletter-forms"
          onSubmit={methods.handleSubmit(handleOnSubmit)}
        >
          <InputField
            label={t('node.builder.subject.label')}
            name="subject"
            size="md"
          />

          <QuerySuggestions query={TR.fetch} queryKey="fetch-templates">
            {({ data, isLoading }) => (
              <SelectField
                helper={t('node.builder.template.helper')}
                isLoading={isLoading}
                label={t('node.builder.template.label')}
                name="template_id"
                options={data?.results?.map(({ id: value, name: label }) => ({
                  label,
                  value,
                }))}
                placeholder={t('node.builder.template.placeholder')}
                size="md"
              />
            )}
          </QuerySuggestions>

          <QuerySuggestions query={BR.fetch} queryKey="fetch-bulks">
            {({ data, isLoading }) => (
              <SelectField
                helper={t('node.builder.recipients.helper')}
                isLoading={isLoading}
                label={t('node.builder.recipients.label')}
                name="bulk_id"
                options={data?.results?.map(({ id: value, name: label }) => ({
                  label,
                  value,
                }))}
                placeholder={t('node.builder.recipients.placeholder')}
                size="md"
              />
            )}
          </QuerySuggestions>

          <FileField
            accept=".png,.pdf"
            helper={t('node.builder.attachment.helper')}
            icon="img"
            label={t('node.builder.attachment.label')}
            name="attachment"
          />
        </form>
      </FormProvider>
    </>
  );
};
