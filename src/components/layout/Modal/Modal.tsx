import { cx } from '@emotion/css';
import { useClickAway } from 'hooks';
import { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { IPropsOf } from 'types.d';

/**
 * Enum for modal sizes.
 * @readonly
 * @enum {string}
 */
export enum ModalSize {
  xs = 'max-w-[320px] w-full',
  sm = 'max-w-[380px] w-full',
  md = 'max-w-[440px] w-full',
  lg = 'max-w-[550px] w-full',
  xl = 'max-w-[610px] w-full',
  full = 'max-w-full min-w-full w-full',
}

export interface IModalProps extends IPropsOf<'div'> {
  /**
   * If `true`, the modal content will be at the center, default is `false`.
   */
  isCentered?: boolean;
  /**
   * If `true`, the modal will be open.
   */
  isOpen: boolean;
  /**
   * Action handler that will be triggered on close modal requests.
   */
  onClose: (v?: boolean) => void;
  /**
   * Modal size, available values are: `xs`, `sm`, `md`, `lg`, `xl` and `full`.
   */
  size?: keyof typeof ModalSize;
}

export const Modal: React.FC<IModalProps> = ({
  children,
  isCentered = false,
  isOpen,
  onClose,
  size = 'md',
  ...rest
}): JSX.Element | null => {
  const contentRef = useRef<HTMLDivElement>(null);

  useClickAway(contentRef, () => onClose());

  if (!isOpen) return null;

  return (
    <div {...rest}>
      <div
        className={cx('fixed inset-0 z-50 overflow-hidden p-8', {
          'flex items-center justify-center': isCentered,
        })}
      >
        <div
          ref={contentRef}
          className={cx(
            'relative mx-auto max-h-full overflow-y-scroll rounded-lg bg-white',
            ModalSize[size],
          )}
        >
          {children}

          <MdClose
            className="absolute right-6 top-4 cursor-pointer hover:scale-110"
            color="#384967"
            onClick={() => onClose()}
            size={20}
          />
        </div>
      </div>

      <div className="fixed inset-0 z-40 bg-black opacity-50" />
    </div>
  );
};
