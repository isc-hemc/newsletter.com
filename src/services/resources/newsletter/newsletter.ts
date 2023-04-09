import { AxiosResponse } from 'axios';
import { IFetchResponse, instance, IResourcesObject } from 'services';

import {
  INewsletterPayload,
  INewsletterResource,
  ISubmissionQueryParams,
  ISubmissionResource,
} from './newsletter.types';

const CUSTOM_HEADERS = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

export const NewsletterResources: IResourcesObject<INewsletterResource> &
  ISubmissionResource = {
  delete: (id: string): Promise<AxiosResponse<unknown>> =>
    instance.delete(`/v1/newsletters/${id}`),

  fetch: (): Promise<AxiosResponse<IFetchResponse<INewsletterResource>>> =>
    instance.get('/v1/newsletters'),

  patch: (
    id: string,
    params: INewsletterPayload,
  ): Promise<AxiosResponse<INewsletterResource>> =>
    instance.patch(`/v1/newsletters/${id}`, params),

  post: (
    params: INewsletterPayload,
  ): Promise<AxiosResponse<INewsletterResource>> =>
    instance.post('/v1/newsletters', params, CUSTOM_HEADERS),

  submission: (
    id: string,
    params?: ISubmissionQueryParams,
  ): Promise<AxiosResponse<unknown>> =>
    instance.get(`/v1/newsletters/${id}/submissions`, { params }),
};
