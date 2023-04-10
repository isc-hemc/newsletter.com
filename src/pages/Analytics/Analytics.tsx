import { H1, H2 } from 'components/typography';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MdConstruction } from 'react-icons/md';

export const Analytics = (): JSX.Element => {
  const { t } = useTranslation('page:analytics');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1 className="mb-2">{t('title')}</H1>

      <H2 className="mb-4 lg:mb-8">{t('subtitle')}</H2>

      <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-4">
        <MdConstruction color="#00C7B1" size={124} />
        <h3 className="text-center text-xl font-medium uppercase text-primary-500">
          {t('wip.title')}
        </h3>
        <p className="text-center text-sm text-primary-500">{t('wip.quote')}</p>
      </div>
    </>
  );
};
