import { EmptySearch } from 'components/elements';
import { BaseTable as T } from 'components/modules';
import _ from 'lodash';
import fp from 'lodash/fp';
import { nanoid } from 'nanoid';
import { Children, ComponentPropsWithoutRef, ElementType } from 'react';
import Skeleton from 'react-loading-skeleton';

export interface ITableProps extends ComponentPropsWithoutRef<ElementType> {
  /**
   * Number of rows that will be rendered in a loading state.
   */
  fallbackRows?: number;
  /**
   * Table headers
   */
  headers: string[];
  /**
   * If `true`, the table will render skeleton data.
   */
  isLoading?: boolean;
}

export const Table: React.FC<ITableProps> = ({
  children,
  fallbackRows = 0,
  headers,
  isLoading = false,
}): JSX.Element => {
  if ((fp.isEmpty(children) || fp.isNil(children)) && !isLoading) {
    return <EmptySearch />;
  }

  return (
    <T.Container>
      <T>
        <T.Thead className="border-b-2 border-gray-200">
          <T.Tr>
            {headers?.map((header) => (
              <T.Th key={header} className="whitespace-nowrap" scope="col">
                {header}
              </T.Th>
            ))}
          </T.Tr>
        </T.Thead>

        <T.Tbody>
          {!isLoading ? (
            Children.toArray(children)
          ) : (
            <>
              {_.times(fallbackRows).map(() => (
                <T.Tr key={nanoid()}>
                  {_.times(headers?.length).map(() => (
                    <T.Td key={nanoid()}>
                      <Skeleton />
                    </T.Td>
                  ))}
                </T.Tr>
              ))}
            </>
          )}
        </T.Tbody>
      </T>
    </T.Container>
  );
};
