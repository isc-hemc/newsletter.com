import { css, cx } from '@emotion/css';
import { clomp } from 'clomp';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IPropsOf } from 'types.d';

import packageJSON from '../../../../package.json';
import { Headline } from './components/Headline';
import { INavigationItem, Navigation } from './components/Navigation';

const BACKGROUND_CLASS = css`
  background: linear-gradient(
    296.77deg,
    #00677f 8.35%,
    #25c4b9 63.28%,
    #2cd5c4 77.22%
  );
`;

const Aside = clomp.aside`
  fixed
  top-0
  z-10
  flex
  h-full
  flex-col
  overflow-y-scroll
  shadow-md
  lg:sticky
`;

export interface ISidebarProps extends IPropsOf<'aside'> {
  /**
   * Sidebar navigation items.
   */
  navigation: INavigationItem[];
}

export const Sidebar: React.FC<ISidebarProps> = ({
  className,
  navigation,
  ...rest
}): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <Aside
      className={cx('min-w-[280px] max-w-[280px]', BACKGROUND_CLASS, className)}
      {...rest}
    >
      <Headline />

      <ul className="flex-1 overflow-y-scroll">
        {navigation?.map((item) => (
          <li key={nanoid()}>
            <Link to={item?.to}>
              <Navigation {...item} />
            </Link>
          </li>
        ))}
      </ul>

      <p className="py-4 text-center text-xs font-bold text-primary-500">
        {t('version', { value: packageJSON?.version })}
      </p>
    </Aside>
  );
};
