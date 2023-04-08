import { cx } from '@emotion/css';
import { useSelector } from '@xstate/react';
import { clomp } from 'clomp';
import { Button } from 'components/elements';
import { NewsletterContext } from 'contexts';
import { MachineNodes } from 'machine';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IPropsOf } from 'types.d';

const F = clomp.footer`
  bg-white
  bottom-0
  fixed
  flex
  max-h-16
  items-center
  justify-center
  border-t-2
  border-gray-200
  px-4
  w-full
`;

export type IFooterProps = IPropsOf<'footer'>;

export const Footer: React.FC<IFooterProps> = ({
  className,
  ...rest
}): JSX.Element | null => {
  const context = useContext(NewsletterContext);

  const isInitialOrFinalNode = useSelector(
    context,
    ({ matches }) => matches(MachineNodes.IDLE) || matches(MachineNodes.RESULT),
  );

  const { t } = useTranslation('page:home');

  if (isInitialOrFinalNode) return null;

  return (
    <F className={cx('min-h-[4rem]', className)} {...rest}>
      <div className="flex max-w-4xl flex-1 justify-between gap-2">
        <Button
          className="px-6 py-2 text-sm"
          colorScheme="gray"
          onClick={() => context?.send('BACK')}
        >
          {t('button.back')}
        </Button>

        <Button
          className="px-6 py-2 text-sm"
          colorScheme="tertiary"
          onClick={() => context?.send('NEXT')}
        >
          {t('button.next')}
        </Button>
      </div>
    </F>
  );
};
