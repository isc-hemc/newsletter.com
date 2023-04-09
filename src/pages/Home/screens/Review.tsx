import { useActor } from '@xstate/react';
import { Button } from 'components/elements';
import { H1, H2 } from 'components/typography';
import { NewsletterContext } from 'contexts';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

export const ReviewScreen = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const [state] = useActor(context);

  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">{t('screen.review.title')}</H1>

      <H2 className="mb-8 text-center">{t('screen.review.subtitle')}</H2>

      <div className="flex flex-1 flex-col rounded-xl border-2 border-gray-200 bg-white p-8">
        <pre>{JSON.stringify(state?.value, null, 2)}</pre>

        <Button
          className="self-center px-6 py-2"
          colorScheme="tertiary"
          onClick={() => context?.send('NEXT')}
        >
          SEND
        </Button>
      </div>
    </>
  );
};
