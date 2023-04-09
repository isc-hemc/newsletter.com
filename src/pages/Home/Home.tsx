import { css, cx } from '@emotion/css';
import { useActor, useSelector } from '@xstate/react';
import { NewsletterContext } from 'contexts';
import { MachineNodes } from 'machine';
import { NewsletterProvider } from 'providers';
import { useContext, useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { BuilderScreen } from './screens/Builder';
import { IdleScreen } from './screens/Idle';
import { NewsletterScreen } from './screens/Newsletter';
import { RecipientsScreen } from './screens/Recipients';
import { ResultsScreen } from './screens/Results';
import { ReviewScreen } from './screens/Review';
import { TemplateScreen } from './screens/Template';

const SCREEN_NODES = {
  [MachineNodes.IDLE]: IdleScreen,
  [MachineNodes.BUILDER]: BuilderScreen,
  [MachineNodes.TEMPLATE]: TemplateScreen,
  [MachineNodes.RECIPIENTS]: RecipientsScreen,
  [MachineNodes.NEWSLETTER]: NewsletterScreen,
  [MachineNodes.REVIEW]: ReviewScreen,
  [MachineNodes.RESULT]: ResultsScreen,
};

const Node = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const isNotFormNode = useSelector(
    context,
    ({ matches }) =>
      matches(MachineNodes.IDLE) ||
      matches(MachineNodes.REVIEW) ||
      matches(MachineNodes.RESULT),
  );

  const isTemplateNode = useSelector(context, ({ matches }) =>
    matches(MachineNodes.TEMPLATE),
  );

  const [state] = useActor(context);

  const UI = useMemo(
    () => SCREEN_NODES[state.value as keyof typeof MachineNodes],
    [state?.value],
  );

  return (
    <section
      className={cx('mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8', {
        '!max-w-3xl': isNotFormNode,
        '!max-w-6xl': isTemplateNode,
        'pb-20': !isNotFormNode,
      })}
    >
      <UI />
    </section>
  );
};

export const Home = (): JSX.Element => {
  const height = use100vh();

  const { t } = useTranslation('page:home');

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

      <NewsletterProvider>
        <main
          className={cx('relative flex flex-col bg-[#F6F8FB]', HEIGHT_CLASS)}
        >
          <Header />

          <Node />

          <Footer />
        </main>
      </NewsletterProvider>
    </>
  );
};
