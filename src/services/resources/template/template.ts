import { AxiosResponse } from 'axios';
import { IFetchResponse, instance, IResourcesObject } from 'services';

import { ITemplatePayload, ITemplateResource } from './template.types';

export const TemplateResources: IResourcesObject<ITemplateResource> = {
  delete: (id: string): Promise<AxiosResponse<unknown>> =>
    instance.delete(`/v1/templates/${id}`),

  fetch: (): Promise<AxiosResponse<IFetchResponse<ITemplateResource>>> =>
    instance.get('/v1/templates'),

  patch: (
    id: string,
    params: ITemplatePayload,
  ): Promise<AxiosResponse<ITemplateResource>> =>
    instance.patch(`/v1/templates/${id}`, params),

  post: (params: ITemplatePayload): Promise<AxiosResponse<ITemplateResource>> =>
    instance.post('/v1/templates', params),
};
