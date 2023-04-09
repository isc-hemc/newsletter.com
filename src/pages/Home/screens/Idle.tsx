import { clomp } from 'clomp';
import { Button } from 'components/elements';
import { H1, H2 } from 'components/typography';
import { NewsletterContext } from 'contexts';
import { i18n } from 'locales';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { MdOutlineTimer } from 'react-icons/md';
import { RiMailSettingsLine } from 'react-icons/ri';
import { IPropsOf } from 'types.d';

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

const Box = clomp.div`
  flex
  flex-col
  gap-4
  rounded-xl
  border-2
  border-gray-200
  bg-white
  py-8
`;

export interface ICardProps extends IPropsOf<'div'> {
  /**
   * List of benefits of using this card option.
   */
  benefits: string[];
  /**
   * Card icon to be rendered.
   */
  icon: IconType;
  /**
   * Card title.
   */
  title: string;
}

export const Card: React.FC<ICardProps> = ({
  benefits,
  icon: Icon,
  onClick,
  title,
  ...rest
}): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <Box {...rest}>
      <Icon className="self-center" color="#00C7B1" size={128} />

      <h3 className="text-center font-semibold uppercase tracking-widest">
        {title}
      </h3>

      <ul className="flex-1 list-disc px-8 text-xs font-medium text-primary-500">
        {benefits?.map((item) => (
          <li key={nanoid()} className="ml-4">
            {item}
          </li>
        ))}
      </ul>

      <Button
        className="mt-4 self-center px-6 py-2 text-sm"
        colorScheme="tertiary"
        onClick={onClick}
      >
        {t('button.start')}
      </Button>
    </Box>
  );
};

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
