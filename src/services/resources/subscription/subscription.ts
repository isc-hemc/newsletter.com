import { AxiosResponse } from 'axios';
import { IFetchResponse, instance } from 'services';

import { ISubscriptionResource } from './subscription.types';

export const ContactSubscriptionResources = {
  fetch: (
    contactId?: string,
  ): Promise<AxiosResponse<IFetchResponse<ISubscriptionResource>>> =>
    instance.get(`/v1/contacts/${contactId}/subscriptions`),
};
