import { AxiosResponse } from 'axios';
import { IFetchResponse, instance, IResourcesObject } from 'services';

import {
  INewsletterTypePayload,
  INewsletterTypeResource,
} from './newsletter-type.types';

export const NewsletterTypeResources: IResourcesObject<INewsletterTypeResource> =
  {
    delete: (id: string): Promise<AxiosResponse<unknown>> =>
      instance.delete(`/v1/newsletter-types/${id}`),

    fetch: (): Promise<
      AxiosResponse<IFetchResponse<INewsletterTypeResource>>
    > => instance.get('/v1/newsletter-types'),

    patch: (
      id: string,
      params: INewsletterTypePayload,
    ): Promise<AxiosResponse<INewsletterTypeResource>> =>
      instance.patch(`/v1/newsletter-types/${id}`, params),

    post: (
      params: INewsletterTypePayload,
    ): Promise<AxiosResponse<INewsletterTypeResource>> =>
      instance.post('/v1/newsletter-types', params),
  };
