import { AxiosResponse } from 'axios';
import { IBaseResource } from 'services';

export interface INewsletterResource extends IBaseResource {
  /**
   * Binary representation of a PDF or PNG file.
   */
  attachment: File;
  /**
   * Newsletter subject message, this field is required.
   */
  subject: string;
  /**
   * Foreign key of a template registry, this field is optional.
   */
  template_id: string;
}

export type INewsletterPayload = Partial<INewsletterResource>;

export interface ISubmissionQueryParams {
  /**
   * Foreign key of a bulk registry, this param is optional and it will be used
   * to send a newsletter to a target audience.
   */
  bulk_id?: null | string;
}

export interface ISubmissionResource {
  /**
   * Makes a HTTP request that will trigger the mail of the given newsletter.
   * @params {string} id - newsletter unique identifier.
   * @params {ISubmissionParams} params - valid query params.
   *
   * @returns {Promise<AxiosResponse<unknown>>}
   */
  submission: (
    id: string,
    params: ISubmissionQueryParams,
  ) => Promise<AxiosResponse<unknown>>;
}
