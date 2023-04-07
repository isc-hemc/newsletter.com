import { H1, H2 } from 'components/typography';
import { useTranslation } from 'react-i18next';

export const NewsletterScreen = (): JSX.Element => {
  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('screen.newsletter.title')}
      </H1>
      <H2 className="text-center">{t('screen.newsletter.subtitle')}</H2>
    </>
  );
};
