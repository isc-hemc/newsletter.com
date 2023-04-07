import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type IThProps = IPropsOf<'th'>;

export const Th = clomp.th`
  bg-gray-100
  font-semibold
  py-3
  px-6
  text-primary-500
  text-left
  text-xs
  tracking-wider
`;
