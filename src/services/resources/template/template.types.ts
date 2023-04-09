import { IBaseResource } from 'services';

export interface ITemplateResource extends IBaseResource {
  /**
   * Template content, it can be HTML code, default is an empty-string.
   */
  content: string;
  /**
   * Template name, this field is required and unique.
   */
  name: string;
}

export type ITemplatePayload = Partial<ITemplateResource>;
