import { H1 } from 'components/typography';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const Contacts = (): JSX.Element => {
  const { t } = useTranslation('page:contacts');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1>Contacts</H1>
    </>
  );
};
