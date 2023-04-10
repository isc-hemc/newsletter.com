import { css, cx } from '@emotion/css';
import Logo from 'assets/img/stori-logo.png';
import { Button, Image } from 'components/elements';
import { MobileNavigation, Sidebar } from 'components/layout';
import { i18n } from 'locales';
import { useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { useTranslation } from 'react-i18next';
import { FaChartBar, FaFileAlt, FaUsers } from 'react-icons/fa';
import { RiContactsBook2Fill, RiMailSettingsFill } from 'react-icons/ri';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const NAVIGATION_ITEMS = [
  {
    icon: FaChartBar,
    label: i18n.t('sidebar.analytics', { ns: 'common' }),
    to: '/analytics',
  },
  {
    icon: RiContactsBook2Fill,
    label: i18n.t('sidebar.contacts', { ns: 'common' }),
    to: '/contacts',
  },
  {
    icon: FaUsers,
    label: i18n.t('sidebar.bulks', { ns: 'common' }),
    to: '/bulks',
  },
  {
    icon: FaFileAlt,
    label: i18n.t('sidebar.templates', { ns: 'common' }),
    to: '/templates',
  },
  {
    icon: RiMailSettingsFill,
    label: i18n.t('sidebar.newsletter-types', { ns: 'common' }),
    to: '/newsletter-types',
  },
];

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();

  const height = use100vh();

  const { t } = useTranslation('common');

  const HEIGHT_CLASS = useMemo(
    () =>
      css`
        height: ${height}px;
      `,
    [height],
  );

  return (
    <main className={cx('relative flex overflow-hidden', HEIGHT_CLASS)}>
      <Sidebar navigation={NAVIGATION_ITEMS} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-4 lg:justify-end lg:px-12">
          <Link className="block lg:hidden" to="/analytics">
            <Image alt="header-avatar" height={32} src={Logo} width={118} />
          </Link>
          <Button
            className="self-center text-sm"
            colorScheme="secondary"
            onClick={() => navigate('/')}
            variant="link"
          >
            {t('button.create-newsletter')}
          </Button>
        </header>

        <section className="flex flex-1 flex-col overflow-hidden bg-[#F6F8FB] px-4 pb-20 pt-8 lg:px-12 lg:pb-8">
          <Outlet />
        </section>
      </div>

      <MobileNavigation navigation={NAVIGATION_ITEMS} />
    </main>
  );
};
