import { IBaseResource } from 'services';

export interface IContactResource extends IBaseResource {
  /**
   * Foreign key of a bulk registry, this field is optional.
   */
  bulk_id: null | string;
  /**
   * Contact email, this field is unique and required.
   */
  email: string;
  /**
   * Contact last name, this field is required.
   */
  last_name: string;
  /**
   * Contact name, this field is required.
   */
  name: string;
}

export type IContactPayload = Partial<IContactResource>;
