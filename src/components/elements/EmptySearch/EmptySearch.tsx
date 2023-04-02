import { clomp } from 'clomp';
import { useTranslation } from 'react-i18next';
import { MdOutlineSearchOff } from 'react-icons/md';
import { IPropsOf } from 'types.d';

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

export type IEmptySearchProps = IPropsOf<'div'>;

export const EmptySearch: React.FC<IEmptySearchProps> = (
  props,
): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <Box {...props}>
      <MdOutlineSearchOff color="#FE507C" size={128} />
      <Text>{t('empty-search')}</Text>
    </Box>
  );
};
