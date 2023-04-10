import { AxiosError, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  ContactSubscriptionResources,
  ISubscriptionResource,
} from 'services/resources';

type IMutationParams = {
  subscription_id: string;
  params: Partial<ISubscriptionResource>;
};

type IMutation = UseMutationResult<
  AxiosResponse<ISubscriptionResource>,
  unknown,
  IMutationParams,
  unknown
>;

export const useUpdateSubscriptions = (): IMutation => {
  const { id: contact_id } = useParams();

  const fn = useCallback(async ({ subscription_id, params }) => {
    const response = await ContactSubscriptionResources.patch(
      contact_id as string,
      subscription_id,
      params,
    );
    return response;
  }, []);

  const onError = useCallback((error: AxiosError) => {
    // TODO: handle errors on [PATCH] requests.
    // eslint-disable-next-line no-console
    console.error(error?.response?.status);
  }, []);

  const onSuccess = useCallback(
    (data: AxiosResponse<ISubscriptionResource>) => {
      // TODO: handle success on [PATCH] requests.
      // eslint-disable-next-line no-console
      console.info(data);
    },
    [],
  );

  const mutation = useMutation(
    ['patch-contact-subscriptions', contact_id],
    fn,
    { onError, onSuccess },
  );

  return mutation;
};
