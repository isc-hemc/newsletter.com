import { AxiosResponse } from 'axios';
import { Children, ReactElement } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { IFetchResponse } from 'services';

type IQuery<T> = UseQueryResult<IFetchResponse<T>, unknown>;

export interface IQuerySuggestionsProps<T> {
  /**
   * Component children.
   */
  children(query: IQuery<T>): ReactElement;
  /**
   * Async function that will retrieve data from the API.
   */
  query: () => Promise<AxiosResponse<IFetchResponse<T>>>;
  /**
   * Query unique identifier.
   */
  queryKey: string;
}

export const QuerySuggestions = <T,>(
  props: IQuerySuggestionsProps<T>,
): JSX.Element => {
  const { children, query, queryKey } = props;

  const q = useQuery(queryKey, async () => {
    const response = await query();
    return response?.data;
  });

  const renderedChildren = children(q);

  return renderedChildren && Children.only(renderedChildren);
};
