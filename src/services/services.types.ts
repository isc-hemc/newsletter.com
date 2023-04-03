import { AxiosResponse } from 'axios';

export interface IBaseResource {
  /**
   * Created date in a fixed-precision format.
   */
  created_at: string;
  /**
   * Registry unique identifier.
   */
  id: number;
  /**
   * If `true`, the registry will be active, otherwise has been soft-deleted.
   */
  is_active: boolean;
  /**
   * Updated date in a fixed-precision format.
   */
  updated_at: string;
}

export interface IFetchResponse<T> {
  /**
   * Resource listing results.
   */
  results: T[];
}

export interface IResourcesObject<T> {
  /**
   * Makes a HTTP DELETE request for the given resource.
   * @params {string} id - resource unique identifier.
   *
   * @returns {Promise<AxiosResponse<unknown>>}
   */
  delete?: (id: string) => Promise<AxiosResponse<unknown>>;
  /**
   * Makes a HTTP GET all request for the given resource.
   *
   * @returns {Promise<AxiosResponse<IFetchResponse<T>>>}
   */
  fetch?: () => Promise<AxiosResponse<IFetchResponse<T>>>;
  /**
   * Makes a HTTP PATCH request for the given resource.
   * @params {string} id - resource unique identifier.
   * @params {Partial<T>} p - resource payload.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  patch?: (id: string, p: Partial<T>) => Promise<AxiosResponse<T>>;
  /**
   * Makes a HTTP POST request for the given resource.
   * @params {Partial<T>} p - resource payload.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  post?: (p: Partial<T>) => Promise<AxiosResponse<T>>;
}
