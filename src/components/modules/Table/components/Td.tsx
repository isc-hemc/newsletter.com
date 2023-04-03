import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type ITdProps = IPropsOf<'td'>;

export const Td = clomp.td`
  px-6
  py-4
  whitespace-nowrap

  first-of-type:rounded-l-xl
  last-of-type:rounded-r-xl
`;
