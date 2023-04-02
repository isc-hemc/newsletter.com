import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const Segments = (): JSX.Element => {
  const { t } = useTranslation('page:segments');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <h1>Segments</h1>
    </>
  );
};
