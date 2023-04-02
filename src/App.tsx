import { css, cx } from '@emotion/css';
import { Sidebar } from 'components/layout';
import { i18n } from 'locales';
import { useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { FaChartBar, FaObjectGroup } from 'react-icons/fa';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';

const NAVIGATION_ITEMS = [
  {
    icon: FaChartBar,
    label: i18n.t('sidebar.dashboard', { ns: 'common' }),
    to: '/',
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

export const App = (): JSX.Element => {
  const height = use100vh();

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

      <section className="flex flex-1 flex-col overflow-hidden px-4 py-12 lg:px-12">
        <Outlet />
      </section>
    </main>
  );
};
