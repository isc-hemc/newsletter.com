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
import { BuilderNode } from './nodes/Builder';
import { IdleNode } from './nodes/Idle';
import { LoadingNode } from './nodes/Loading';
import { NewsletterNode } from './nodes/Newsletter';
import { RecipientsNode } from './nodes/Recipients';
import { ResultsNode } from './nodes/Results';
import { ReviewNode } from './nodes/Review';
import { TemplateNode } from './nodes/Template';

const NODES = {
  [MachineNodes.IDLE]: IdleNode,
  [MachineNodes.BUILDER]: BuilderNode,
  [MachineNodes.TEMPLATE]: TemplateNode,
  [MachineNodes.RECIPIENTS]: RecipientsNode,
  [MachineNodes.NEWSLETTER]: NewsletterNode,
  [MachineNodes.REVIEW]: ReviewNode,
  [MachineNodes.RESULT]: ResultsNode,
  [MachineNodes.CREATE_TEMPLATE]: LoadingNode,
  [MachineNodes.CREATE_RECIPIENTS]: LoadingNode,
  [MachineNodes.CREATE_NEWSLETTER]: LoadingNode,
  [MachineNodes.SUBMIT_NEWSLETTER]: LoadingNode,
};

const Node = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const isInitialOrFinalNode = useSelector(
    context,
    ({ matches }) => matches(MachineNodes.IDLE) || matches(MachineNodes.RESULT),
  );

  const isReviewNode = useSelector(context, ({ matches }) =>
    matches(MachineNodes.REVIEW),
  );

  const isTemplateNode = useSelector(context, ({ matches }) =>
    matches(MachineNodes.TEMPLATE),
  );

  const [state] = useActor(context);

  const UI = useMemo(
    () => NODES[state.value as keyof typeof MachineNodes],
    [state?.value],
  );

  return (
    <section
      className={cx(
        'flex w-full max-w-4xl flex-1 flex-col self-center overflow-x-hidden px-4 py-8',
        {
          '!max-w-3xl': isInitialOrFinalNode,
          '!max-w-6xl': isTemplateNode,
          '!max-w-xl': isReviewNode,
          'pb-20': !isInitialOrFinalNode && !isReviewNode,
        },
      )}
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
