import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type ITheadProps = IPropsOf<'thead'>;

export const Thead = clomp.thead`
  sticky
  top-0
`;
