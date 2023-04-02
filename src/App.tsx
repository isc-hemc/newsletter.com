import { css, cx } from '@emotion/css';
import { Sidebar } from 'components/layout';
import { useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { FaChartBar, FaObjectGroup } from 'react-icons/fa';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';

const NAVIGATION_ITEMS = [
  { icon: FaChartBar, label: 'Dashboard', to: '/' },
  { icon: RiContactsBook2Fill, label: 'Contacts', to: '/contacts' },
  { icon: FaObjectGroup, label: 'Segments', to: '/segments' },
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
    <main className={cx('relative overflow-hidden', HEIGHT_CLASS)}>
      <Sidebar navigation={NAVIGATION_ITEMS} />

      <section className="flex flex-1 flex-col overflow-hidden px-4 py-6 lg:px-6">
        <Outlet />
      </section>
    </main>
  );
};
