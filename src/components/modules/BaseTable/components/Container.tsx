import { clomp } from 'clomp';
import { forwardRef } from 'react';
import { IPropsOf } from 'types.d';
import { __DEV__ } from 'utils';

const Box = clomp.div`
  border-2
  border-gray-200
  overflow-scroll
  rounded-xl
`;

export type IContainerProps = IPropsOf<'div'>;

export const Container = forwardRef<HTMLDivElement, IContainerProps>(
  ({ children, ...rest }, ref): JSX.Element => (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  ),
);

if (__DEV__) {
  Container.displayName = 'Container';
}
