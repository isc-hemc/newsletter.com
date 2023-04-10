import { AxiosResponse } from 'axios';
import { IFetchResponse, instance } from 'services';

import {
  ISubscriptionPayload,
  ISubscriptionResource,
} from './subscription.types';

export const ContactSubscriptionResources = {
  fetch: (
    contactId?: string,
  ): Promise<AxiosResponse<IFetchResponse<ISubscriptionResource>>> =>
    instance.get(`/v1/contacts/${contactId}/subscriptions`),

  patch: (
    contact_id: string,
    subscription_id: string,
    params: ISubscriptionPayload,
  ): Promise<AxiosResponse<ISubscriptionResource>> =>
    instance.patch(
      `/v1/contacts/${contact_id}/subscriptions/${subscription_id}`,
      params,
    ),
};
