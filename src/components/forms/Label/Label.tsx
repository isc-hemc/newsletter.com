import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

/**
 * Enum for the label font sizes.
 * @readonly
 * @enum {string}
 */
export enum LabelFontSize {
  xs = 'text-xs',
  sm = 'text-sm',
  md = 'text-md',
  lg = 'text-lg',
  xl = 'text-xl',
}

export type ILabelProps = IPropsOf<'label'>;

export const Label = clomp.label`
  font-semibold
  text-primary-500
`;
