import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type ITbodyProps = IPropsOf<'tbody'>;

export const Tbody = clomp.tbody`
  bg-white
  border-none
  divide-gray-200
  divide-y
  text-sm
  text-primary-500
`;
