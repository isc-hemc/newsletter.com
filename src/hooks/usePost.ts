import { AxiosError, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { useLocation } from 'react-router-dom';
import { IResourcesObject } from 'services';

type IMutation<T> = UseMutationResult<
  AxiosResponse<T>,
  unknown,
  Partial<T>,
  unknown
>;

export const usePost = <T>(r: IResourcesObject<T>): IMutation<T> => {
  const { pathname } = useLocation();

  const fn = useCallback(async (p: Partial<T>) => {
    const response = await r.post(p);
    return response;
  }, []);

  const onError = useCallback((error: AxiosError) => {
    // TODO: handle errors on [POST] requests.
    // eslint-disable-next-line no-console
    console.error(error?.response?.status);
  }, []);

  const mutation = useMutation(['post', pathname], fn, { onError });

  return mutation;
};
