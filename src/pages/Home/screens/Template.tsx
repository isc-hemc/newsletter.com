import { Input } from 'components/inputs';
import { H1, H2 } from 'components/typography';
import { useRef } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';
import { useTranslation } from 'react-i18next';

export const TemplateScreen = (): JSX.Element => {
  const ref = useRef<EditorRef>(null);

  const { t } = useTranslation('page:home');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnExportHTML = () => {
    ref?.current?.editor?.exportHtml((data) => {
      const { html } = data;
      // eslint-disable-next-line no-console
      console.log('handleExportHTML', html);
    });
  };

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('screen.template.title')}
      </H1>

      <H2 className="mb-8 text-center">{t('screen.template.subtitle')}</H2>

      <Input
        className="mb-4 w-full self-center lg:max-w-md"
        placeholder="Nombre..."
        size="md"
      />

      <div className="overflow-x-scroll rounded-xl border-2 border-gray-200 bg-white">
        <EmailEditor ref={ref} />
      </div>
    </>
  );
};
