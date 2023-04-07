import { H1, H2 } from 'components/typography';
import { useTranslation } from 'react-i18next';

export const TemplateScreen = (): JSX.Element => {
  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('screen.template.title')}
      </H1>
      <H2 className="text-center">{t('screen.template.subtitle')}</H2>
    </>
  );
};
