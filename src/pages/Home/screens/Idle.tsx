import { H1, H2 } from 'components/typography';
import { NewsletterContext } from 'contexts';
import { i18n } from 'locales';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineTimer } from 'react-icons/md';
import { RiMailSettingsLine } from 'react-icons/ri';

import { Card } from '../components/Card';

const MANUAL_SETUP_BENEFITS = [
  i18n.t('screen.idle.manual-setup.create-template', { ns: 'page:home' }),
  i18n.t('screen.idle.manual-setup.upload-contacts', { ns: 'page:home' }),
  i18n.t('screen.idle.manual-setup.config-newsletter', { ns: 'page:home' }),
  i18n.t('screen.idle.manual-setup.upload-attachment', { ns: 'page:home' }),
];

const QUICK_START_BENEFITS = [
  i18n.t('screen.idle.quick-start.select-template', { ns: 'page:home' }),
  i18n.t('screen.idle.quick-start.select-contacts', { ns: 'page:home' }),
  i18n.t('screen.idle.quick-start.review-newsletter', { ns: 'page:home' }),
  i18n.t('screen.idle.quick-start.less-than-a-minute', { ns: 'page:home' }),
];

export const IdleScreen = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">{t('screen.idle.title')}</H1>

      <H2 className="mb-8 text-center">{t('screen.idle.subtitle')}</H2>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card
          benefits={MANUAL_SETUP_BENEFITS}
          className="flex-1"
          icon={RiMailSettingsLine}
          onClick={() => context?.send('MANUAL_SETUP')}
          title={t('screen.idle.manual-setup.title')}
        />

        <Card
          benefits={QUICK_START_BENEFITS}
          className="flex-1"
          icon={MdOutlineTimer}
          onClick={() => context?.send('QUICK_START')}
          title={t('screen.idle.quick-start.title')}
        />
      </div>
    </>
  );
};
