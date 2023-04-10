import { IBaseResource } from 'services';

export interface ISubscriptionResource extends IBaseResource {
  /**
   * Foreign key of a contact registry, this field is required.
   */
  contact_id: string;
  /**
   * If `true`, it means that this contact will receive newsletters related to
   * the newsletter-type, default is `True`.
   */
  is_active: boolean;
  /**
   * Foreign key of a newsletter-type registry, this field is required.
   */
  newsletter_type_id: string;
}

export type ISubscriptionPayload = Partial<ISubscriptionResource>;
