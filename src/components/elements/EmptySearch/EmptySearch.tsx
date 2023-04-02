import { clomp } from 'clomp';
import { useTranslation } from 'react-i18next';
import { IPropsOf } from 'types.d';

import { Icon, IIconProps } from './components/Icon';

const Box = clomp.div`
  flex
  flex-1
  flex-col
  items-center
  justify-center
`;

const Text = clomp.p`
  mt-4
  text-sm
  font-medium
  tracking-wider
  text-primary-500
`;

export type IEmptySearchProps = IPropsOf<'div'> & IIconProps;

export const EmptySearch: React.FC<IEmptySearchProps> = ({
  className,
  ...svgProps
}): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <Box className={className}>
      <Icon {...svgProps} />
      <Text>{t('empty-search')}</Text>
    </Box>
  );
};
