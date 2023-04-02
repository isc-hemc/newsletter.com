import { cx } from '@emotion/css';
import fp from 'lodash/fp';
import { useTranslation } from 'react-i18next';
import { MdOutlineWarning } from 'react-icons/md';
import { IPropsOf } from 'types.d';

export interface IErrorMessageProps extends IPropsOf<'div'> {
  /**
   * Left icon color, default is `#D0011B`.
   */
  iconColor?: string;
  /**
   * Left icon height and width, default is `18`.
   */
  iconSize?: number;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = ({
  children,
  className,
  iconColor = '#D0011B',
  iconSize = 18,
  ...rest
}): JSX.Element | null => {
  const { t } = useTranslation('errors');

  if (fp.isEmpty(children) || fp.isNil(children)) return null;

  return (
    <div className={cx('flex items-center gap-2', className)} {...rest}>
      <MdOutlineWarning color={iconColor} size={iconSize} />
      <span className="text-xs font-bold text-primary-300">{t(children)}</span>
    </div>
  );
};
