import { NewsletterProvider } from 'providers';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { IdleScreen } from './screens/Idle';

export const Home = (): JSX.Element => {
  const { t } = useTranslation('page:home');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <NewsletterProvider>
        <main className="relative flex h-screen flex-col">
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
