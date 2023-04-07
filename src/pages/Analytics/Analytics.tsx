import { H1, H2 } from 'components/typography';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const Analytics = (): JSX.Element => {
  const { t } = useTranslation('page:analytics');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1 className="mb-2">{t('heading')}</H1>

      <H2 className="mb-14">{t('subheading')}</H2>
    </>
  );
};
