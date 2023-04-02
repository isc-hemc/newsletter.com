import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const Contacts = (): JSX.Element => {
  const { t } = useTranslation('page:contacts');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <h1>Contacts</h1>
    </>
  );
};
