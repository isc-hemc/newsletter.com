import { useQuery, UseQueryResult } from 'react-query';
import { useLocation } from 'react-router-dom';
import { IFetchResponse, IResourcesObject } from 'services';

type IQuery<T> = UseQueryResult<IFetchResponse<T>, unknown>;

export const useFetch = <T>(r: IResourcesObject<T>): IQuery<T> => {
  const { pathname } = useLocation();

  const query = useQuery(['fetch-all', pathname], async () => {
    const response = await r?.fetch();
    return response?.data;
  });

  return query;
};
