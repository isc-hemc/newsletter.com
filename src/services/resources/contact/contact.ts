import { AxiosResponse } from 'axios';
import { IFetchResponse, instance, IResourcesObject } from 'services';

import { IContactPayload, IContactResource } from './contact.types';

export const ContactResources: IResourcesObject<IContactResource> = {
  delete: (id: string): Promise<AxiosResponse<unknown>> =>
    instance.delete(`/v1/contacts/${id}/`),

  fetch: (): Promise<AxiosResponse<IFetchResponse<IContactResource>>> =>
    instance.get('/v1/contacts/'),

  patch: (
    id: string,
    params: IContactPayload,
  ): Promise<AxiosResponse<IContactResource>> =>
    instance.patch(`/v1/contacts/${id}/`, params),

  post: (params: IContactPayload): Promise<AxiosResponse<IContactResource>> =>
    instance.post('/v1/contacts/', params),
};
