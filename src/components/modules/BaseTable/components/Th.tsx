import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

export type IThProps = IPropsOf<'th'>;

export const Th = clomp.th`
  bg-gray-50
  font-medium
  py-3
  px-6
  text-primary-500
  text-left
  text-xs
  tracking-wider

  first-of-type:rounded-l-xl
  last-of-type:rounded-r-xl
`;
