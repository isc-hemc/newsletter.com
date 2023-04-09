import { clomp } from 'clomp';
import { Button } from 'components/elements';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { IPropsOf } from 'types.d';

const Box = clomp.div`
  flex
  flex-col
  gap-4
  rounded-xl
  border-2
  border-gray-200
  bg-white
  py-8
`;

export interface ICardProps extends IPropsOf<'div'> {
  /**
   * List of benefits of using this card option.
   */
  benefits: string[];
  /**
   * Card icon to be rendered.
   */
  icon: IconType;
  /**
   * Card title.
   */
  title: string;
}

export const Card: React.FC<ICardProps> = ({
  benefits,
  icon: Icon,
  onClick,
  title,
  ...rest
}): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <Box {...rest}>
      <Icon className="self-center" color="#00C7B1" size={128} />

      <h3 className="text-center font-semibold uppercase tracking-widest">
        {title}
      </h3>

      <ul className="flex-1 list-disc px-8 text-xs font-medium text-primary-500">
        {benefits?.map((item) => (
          <li key={nanoid()} className="ml-4">
            {item}
          </li>
        ))}
      </ul>

      <Button
        className="mt-4 self-center px-6 py-2 text-sm"
        colorScheme="tertiary"
        onClick={onClick}
      >
        {t('button.start')}
      </Button>
    </Box>
  );
};
