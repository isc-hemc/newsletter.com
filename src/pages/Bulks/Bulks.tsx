import { Table } from 'components/layout';
import { BaseTable as T } from 'components/modules';
import { H1, H2 } from 'components/typography';
import { useFetch } from 'hooks';
import { i18n } from 'locales';
import { nanoid } from 'nanoid';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BulkResources, IBulkResource } from 'services/resources';
import { formatDate } from 'utils';

export const TABLE_HEADERS = [
  i18n.t('name', { ns: 'page:bulks' }),
  i18n.t('inserted', { ns: 'page:bulks' }),
  i18n.t('errors', { ns: 'page:bulks' }),
  i18n.t('created-at', { ns: 'page:bulks' }),
  i18n.t('updated-at', { ns: 'page:bulks' }),
];

export const Bulks = (): JSX.Element => {
  const { data: bulks, isLoading } = useFetch<IBulkResource>(BulkResources);

  const { t } = useTranslation('page:bulks');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1 className="mb-2">{t('title')}</H1>

      <H2 className="mb-4 lg:mb-8">{t('subtitle')}</H2>

      <Table fallbackRows={5} headers={TABLE_HEADERS} isLoading={isLoading}>
        {bulks?.results?.map((item: IBulkResource) => (
          <T.Tr key={nanoid()}>
            <T.Td>{item?.name}</T.Td>
            <T.Td>{item?.inserted}</T.Td>
            <T.Td>{item?.errors}</T.Td>
            <T.Td>{formatDate(item?.created_at)}</T.Td>
            <T.Td>{formatDate(item?.updated_at)}</T.Td>
          </T.Tr>
        ))}
      </Table>
    </>
  );
};
