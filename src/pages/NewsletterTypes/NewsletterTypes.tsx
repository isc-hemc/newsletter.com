import { Table } from 'components/layout';
import { BaseTable as T } from 'components/modules';
import { H1, H2 } from 'components/typography';
import { useFetch } from 'hooks';
import { i18n } from 'locales';
import { nanoid } from 'nanoid';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  INewsletterTypeResource,
  NewsletterTypeResources,
} from 'services/resources';
import { formatDate } from 'utils';

export const TABLE_HEADERS = [
  i18n.t('name', { ns: 'page:newsletter-types' }),
  i18n.t('description', { ns: 'page:newsletter-types' }),
  i18n.t('tag', { ns: 'page:newsletter-types' }),
  i18n.t('created-at', { ns: 'page:newsletter-types' }),
  i18n.t('updated-at', { ns: 'page:newsletter-types' }),
];

export const NewsletterTypes = (): JSX.Element => {
  const { data: types, isLoading } = useFetch<INewsletterTypeResource>(
    NewsletterTypeResources,
  );

  const { t } = useTranslation('page:newsletter-types');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1 className="mb-2">{t('title')}</H1>

      <H2 className="mb-4 lg:mb-8">{t('subtitle')}</H2>

      <Table fallbackRows={10} headers={TABLE_HEADERS} isLoading={isLoading}>
        {types?.results?.map((item: INewsletterTypeResource) => (
          <T.Tr key={nanoid()}>
            <T.Td>{item?.name}</T.Td>
            <T.Td>{item?.description || '-'}</T.Td>
            <T.Td>{item?.tag}</T.Td>
            <T.Td>{formatDate(item?.created_at)}</T.Td>
            <T.Td>{formatDate(item?.updated_at)}</T.Td>
          </T.Tr>
        ))}
      </Table>
    </>
  );
};
