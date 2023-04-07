import { css, cx } from '@emotion/css';
import { Button } from 'components/elements';
import { Sidebar } from 'components/layout';
import { i18n } from 'locales';
import { useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { useTranslation } from 'react-i18next';
import { FaChartBar, FaObjectGroup } from 'react-icons/fa';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { Outlet, useNavigate } from 'react-router-dom';

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
    icon: FaObjectGroup,
    label: i18n.t('sidebar.segments', { ns: 'common' }),
    to: '/segments',
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
        <header className="flex h-16 justify-end border-b-2 border-gray-200 bg-white px-4 lg:px-12">
          <Button
            className="self-center text-sm"
            colorScheme="secondary"
            onClick={() => navigate('/')}
            variant="link"
          >
            {t('button.create-newsletter')}
          </Button>
        </header>

        <section className="flex flex-1 flex-col overflow-hidden bg-[#F6F8FB] px-4 py-8 lg:px-12">
          <Outlet />
        </section>
      </div>
    </main>
  );
};
