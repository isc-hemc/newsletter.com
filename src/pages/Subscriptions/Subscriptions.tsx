import { css, cx } from '@emotion/css';
import { H1, H2 } from 'components/typography';
import { useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FadeLoader } from 'react-spinners';

import { Header } from './components/Header';
import { useFetchContactSubscriptions } from './hooks';

export const Subscriptions = (): JSX.Element => {
  const { data, isLoading } = useFetchContactSubscriptions();

  const { t } = useTranslation('page:subscriptions');

  const height = use100vh();

  const HEIGHT_CLASS = useMemo(
    () =>
      css`
        min-height: ${height}px;
      `,
    [height],
  );

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <main className={cx('relative flex flex-col bg-[#F6F8FB]', HEIGHT_CLASS)}>
        <Header />

        {isLoading ? (
          <FadeLoader className="!fixed !inset-1/2" color="#00C7B1" />
        ) : (
          <section className="flex w-full max-w-3xl flex-1 flex-col self-center px-4 py-8">
            <H1 className="mb-2 text-center uppercase">{t('title')}</H1>

            <H2 className="mb-8 text-center">{t('subtitle')}</H2>

            <div className="flex rounded-xl border-2 border-gray-200 bg-white p-4">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </section>
        )}
      </main>
    </>
  );
};
