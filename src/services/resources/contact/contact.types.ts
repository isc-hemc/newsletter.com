import { IBaseResource } from 'services';

export interface IContactResource extends IBaseResource {
  /**
   * Contact email.
   */
  email: string;
  /**
   * Contact last name.
   */
  last_name: string;
  /**
   * Contact name.
   */
  name: string;
}

export type IContactPayload = Partial<IContactResource>;
