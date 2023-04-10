import { cx } from '@emotion/css';
import { clomp } from 'clomp';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { INavigationItem, IPropsOf } from 'types.d';

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
        className={cx('text-[.4rem] text-primary-500 md:text-[.5rem]', {
          'font-bold': isSelected,
        })}
      >
        {label}
      </p>
    </NavItem>
  );
};

const Nav = clomp.nav`
  bg-secondary-500
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
  navigation,
  ...rest
}): JSX.Element => (
  <Nav {...rest}>
    {navigation?.map((item) => (
      <NavigationItem key={nanoid()} {...item} />
    ))}
  </Nav>
);
