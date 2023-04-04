import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type IH1Props = IPropsOf<'h1'>;

export const H1 = clomp.h1`
  font-medium
  text-primary-500
  text-3xl
  tracking-widest
`;
