import Logo from 'assets/img/stori-logo.png';
import { clomp } from 'clomp';
import { Image } from 'components/elements';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IPropsOf } from 'types.d';

const Box = clomp.div`
  flex
  w-full
  flex-col
  items-center
  justify-center
  px-4
  py-12
`;

const Text = clomp.p`
  mt-2
  text-center
  font-medium
  uppercase
  text-primary-500
  tracking-widest
`;

export type IHeadlineProps = IPropsOf<'div'>;

export const Headline: React.FC<IHeadlineProps> = (props): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <Box {...props}>
      <Link to="/analytics">
        <Image alt="sidebar-avatar" height={48} src={Logo} width={180} />
      </Link>
      <Text>{t('sidebar.headline')}</Text>
    </Box>
  );
};
