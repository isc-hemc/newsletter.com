import { IBaseResource } from 'services';

export interface IBulkResource extends IBaseResource {
  /**
   * Number of errors detected in data, e.g. repeated data, defualt is `0`.
   */
  errors: number;
  /**
   * Number of inserted rows, defualt is `0`.
   */
  inserted: number;
  /**
   * Custom name for the bulk, this field is required and unique.
   */
  name: string;
}

export interface IBulkPayload extends Partial<IBulkResource> {
  /**
   * File with a bunch of contacts, this field is required in order to create a
   * new registry, for update operations is not necessary.
   */
  csv?: File;
}
