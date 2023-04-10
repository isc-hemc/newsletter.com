import { cx } from '@emotion/css';
import Logo from 'assets/img/stori-logo.png';
import { clomp } from 'clomp';
import { Image } from 'components/elements';
import { Link } from 'react-router-dom';
import { IPropsOf } from 'types.d';

const H = clomp.header`
  flex
  max-h-16
  items-center
  justify-center
  border-2
  border-gray-200
  bg-white
`;

export type IHeaderProps = IPropsOf<'header'>;

export const Header: React.FC<IHeaderProps> = ({
  className,
  ...rest
}): JSX.Element => (
  <H className={cx('min-h-[4rem]', className)} {...rest}>
    <Link to="/">
      <Image alt="header-avatar" height={32} src={Logo} width={118} />
    </Link>
  </H>
);
