import { H1, H2 } from 'components/typography';
import { useTranslation } from 'react-i18next';

export const ReviewScreen = (): JSX.Element => {
  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">{t('screen.review.title')}</H1>
      <H2 className="text-center">{t('screen.review.subtitle')}</H2>
    </>
  );
};
