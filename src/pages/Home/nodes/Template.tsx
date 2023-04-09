import { InputField } from 'components/forms';
import { H1, H2 } from 'components/typography';
import { NewsletterContext } from 'contexts';
import { useCallback, useContext, useRef } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const TemplateNode = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const methods = useForm();

  const ref = useRef<EditorRef>(null);

  const { t } = useTranslation('page:home');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnSubmit = useCallback((v) => {
    ref?.current?.editor?.exportHtml((data) => {
      const { html } = data;
      context?.send('NEXT', { ...v, content: html });
    });
  }, []);

  return (
    <>
      <H1 className="mb-2 text-center uppercase">{t('node.template.title')}</H1>

      <H2 className="mb-8 text-center">{t('node.template.subtitle')}</H2>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          id="newsletter-forms"
          onSubmit={methods.handleSubmit(handleOnSubmit)}
        >
          <InputField
            className="mb-4 w-full self-center lg:max-w-md"
            name="name"
            placeholder="Template name"
            size="md"
          />

          <div className="overflow-x-scroll rounded-xl border-2 border-gray-200 bg-white">
            <EmailEditor ref={ref} />
          </div>
        </form>
      </FormProvider>
    </>
  );
};
