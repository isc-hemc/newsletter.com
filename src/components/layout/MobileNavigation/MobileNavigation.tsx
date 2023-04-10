import { css, cx } from '@emotion/css';
import { clomp } from 'clomp';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { INavigationItem, IPropsOf } from 'types.d';

const BACKGROUND_CLASS = css`
  background: linear-gradient(
    296.77deg,
    #00677f 8.35%,
    #25c4b9 63.28%,
    #2cd5c4 77.22%
  );
`;

const NavItem = clomp(Link)`
  flex
  h-full
  flex-1
  flex-col
  items-center
  justify-center
  gap-1
  border-b-4
  border-transparent
  hover:font-semibold
`;

type INavigationItemProps = IPropsOf<'div'> & INavigationItem;

const NavigationItem: React.FC<INavigationItemProps> = ({
  icon: Icon,
  label,
  to,
  ...rest
}): JSX.Element => {
  const location = useLocation();

  const isSelected = useMemo(() => location?.pathname === to, [location, to]);

  return (
    <NavItem
      className={cx({ '!border-primary-500': isSelected })}
      to={to}
      {...rest}
    >
      <Icon color="#384967" size={24} />
      <p
        className={cx('text-[.5rem] text-primary-500', {
          'font-bold': isSelected,
        })}
      >
        {label}
      </p>
    </NavItem>
  );
};

const Nav = clomp.nav`
  fixed
  bottom-0
  flex
  h-16
  w-full
  justify-around
  gap-4
  px-4
  lg:hidden
`;

export interface IMobileNavigationProps extends IPropsOf<'nav'> {
  /**
   * Mobile navigation items.
   */
  navigation: INavigationItem[];
}

export const MobileNavigation: React.FC<IMobileNavigationProps> = ({
  className,
  navigation,
  ...rest
}): JSX.Element => (
  <Nav className={cx(BACKGROUND_CLASS, className)} {...rest}>
    {navigation?.map((item) => (
      <NavigationItem key={nanoid()} {...item} />
    ))}
  </Nav>
);
