import { cx } from '@emotion/css';
import fp from 'lodash/fp';
import { MdInfo } from 'react-icons/md';
import { IPropsOf } from 'types.d';

export interface IHelperTextProps extends IPropsOf<'div'> {
  /**
   * Left icon color, default is `#6B7C9A`.
   */
  iconColor?: string;
  /**
   * Left icon height and width, default is `18`.
   */
  iconSize?: number;
}

export const HelperText: React.FC<IHelperTextProps> = ({
  children,
  className,
  iconColor = '#6B7C9A',
  iconSize = 18,
  ...rest
}): JSX.Element | null => {
  if (fp.isEmpty(children) || fp.isNil(children)) return null;

  return (
    <div className={cx('flex items-center gap-2', className)} {...rest}>
      <MdInfo color={iconColor} size={iconSize} />
      <span className="text-xs font-bold text-primary-300">{children}</span>
    </div>
  );
};
