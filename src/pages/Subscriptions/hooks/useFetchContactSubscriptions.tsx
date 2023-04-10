import { useQuery, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { IFetchResponse } from 'services';
import {
  ContactSubscriptionResources,
  ISubscriptionResource,
} from 'services/resources';

type IQuery = UseQueryResult<IFetchResponse<ISubscriptionResource>, unknown>;

export const useFetchContactSubscriptions = (): IQuery => {
  const { id } = useParams();

  const query = useQuery(['fetch-contact-subscriptions', id], async () => {
    const response = await ContactSubscriptionResources.fetch(id);
    return response?.data;
  });

  return query;
};
