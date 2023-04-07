import { H1, H2 } from 'components/typography';
import { NewsletterContext } from 'contexts';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

export const IdleScreen = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">{t('screen.idle.title')}</H1>
      <H2 className="text-center">{t('screen.idle.subtitle')}</H2>

      <div className="mt-4 flex justify-between gap-2">
        <button onClick={() => context?.send('MANUAL_SETUP')} type="button">
          MANUAL_SETUP
        </button>
        <button onClick={() => context?.send('QUICK_START')} type="button">
          QUICK_START
        </button>
      </div>
    </>
  );
};
