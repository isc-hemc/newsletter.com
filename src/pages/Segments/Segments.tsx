import { H1 } from 'components/typography';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const Segments = (): JSX.Element => {
  const { t } = useTranslation('page:segments');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1>Segments</H1>
    </>
  );
};
