import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type ITbodyProps = IPropsOf<'tbody'>;

export const Tbody = clomp.tbody`
  bg-white
  text-sm
  text-primary-500
`;
