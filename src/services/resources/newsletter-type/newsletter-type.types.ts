import { IBaseResource } from 'services';

export interface INewsletterTypeResource extends IBaseResource {
  /**
   * Newsletter Type description, this field is optional.
   */
  description: string;
  /**
   * Newsletter Type name, this field is required.
   */
  name: string;
  /**
   * Newsletter Type identifier, this field is required and unique.
   */
  tag: string;
}

export type INewsletterTypePayload = Partial<INewsletterTypeResource>;
