import { cx } from '@emotion/css';
import Logo from 'assets/img/stori-logo.png';
import { clomp } from 'clomp';
import { Button, Image } from 'components/elements';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { IPropsOf } from 'types.d';

const H = clomp.header`
  bg-white
  flex
  max-h-16
  items-center
  justify-center
  border-b-2
  border-gray-200
  px-4
`;

export type IHeaderProps = IPropsOf<'header'>;

export const Header: React.FC<IHeaderProps> = ({
  className,
  ...rest
}): JSX.Element => {
  const navigate = useNavigate();

  const { t } = useTranslation('page:home');

  return (
    <H className={cx('min-h-[4rem]', className)} {...rest}>
      <div className="flex max-w-7xl flex-1 justify-between gap-2">
        <Link to="/">
          <Image alt="header-avatar" height={32} src={Logo} width={118} />
        </Link>

        <Button
          className="self-center text-sm"
          colorScheme="secondary"
          onClick={() => navigate('/analytics')}
          variant="link"
        >
          {t('button.dashboard')}
        </Button>
      </div>
    </H>
  );
};
