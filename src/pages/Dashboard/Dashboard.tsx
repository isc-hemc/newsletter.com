import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const Dashboard = (): JSX.Element => {
  const { t } = useTranslation('page:dashboard');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <h1>Dashboard</h1>
    </>
  );
};
