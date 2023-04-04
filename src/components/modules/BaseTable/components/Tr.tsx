import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type ITrProps = IPropsOf<'tr'>;

export const Tr = clomp.tr`
  border-none

  even:bg-gray-25
`;
