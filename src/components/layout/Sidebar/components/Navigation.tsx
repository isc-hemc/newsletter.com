import { cx } from '@emotion/css';
import { clomp } from 'clomp';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { INavigationItem, IPropsOf } from 'types.d';

const Box = clomp.div`
  flex
  items-center
  gap-4
  border-l-4
  border-transparent
  px-6
  py-4
  hover:font-semibold
`;

export type INavigationProps = IPropsOf<'div'> & INavigationItem;

export const Navigation: React.FC<INavigationProps> = ({
  icon: Icon,
  label,
  to,
  ...rest
}): JSX.Element => {
  const location = useLocation();

  const isSelected = useMemo(() => location?.pathname === to, [location, to]);

  return (
    <Box className={cx({ '!border-primary-500': isSelected })} {...rest}>
      <Icon color="#384967" size={22} />
      <p
        className={cx('flex-1 text-sm text-primary-500', {
          'font-bold': isSelected,
        })}
      >
        {label}
      </p>
    </Box>
  );
};
