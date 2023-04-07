import { css, cx } from '@emotion/css';
import { NewsletterProvider } from 'providers';
import { useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { IdleScreen } from './screens/Idle';

export const Home = (): JSX.Element => {
  const height = use100vh();

  const { t } = useTranslation('page:home');

  const HEIGHT_CLASS = useMemo(
    () =>
      css`
        height: ${height}px;
      `,
    [height],
  );

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <NewsletterProvider>
        <main className={cx('relative flex flex-col', HEIGHT_CLASS)}>
          <Header />

          <section className="mx-auto w-full max-w-3xl flex-1 px-4 pb-20 pt-4">
            <IdleScreen />
          </section>

          <Footer />
        </main>
      </NewsletterProvider>
    </>
  );
};
