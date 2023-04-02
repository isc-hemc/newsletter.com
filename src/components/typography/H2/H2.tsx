import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type IH2Props = IPropsOf<'h2'>;

export const H2 = clomp.h2`
  font-medium
  text-primary-500
  text-xs
  tracking-widest
`;
