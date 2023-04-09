import { AxiosResponse } from 'axios';
import { IFetchResponse, instance, IResourcesObject } from 'services';

import { IBulkPayload, IBulkResource } from './bulk.types';

const CUSTOM_HEADERS = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

export const BulkResources: IResourcesObject<IBulkResource> = {
  delete: (id: string): Promise<AxiosResponse<unknown>> =>
    instance.delete(`/v1/bulks/${id}`),

  fetch: (): Promise<AxiosResponse<IFetchResponse<IBulkResource>>> =>
    instance.get('/v1/bulks'),

  patch: (
    id: string,
    params: IBulkPayload,
  ): Promise<AxiosResponse<IBulkResource>> =>
    instance.patch(`/v1/bulks/${id}`, params),

  post: (params: IBulkPayload): Promise<AxiosResponse<IBulkResource>> =>
    instance.post('/v1/bulks', params, CUSTOM_HEADERS),
};
