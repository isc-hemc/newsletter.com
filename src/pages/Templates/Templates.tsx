import { Table } from 'components/layout';
import { BaseTable as T } from 'components/modules';
import { H1, H2 } from 'components/typography';
import { useFetch } from 'hooks';
import { i18n } from 'locales';
import { nanoid } from 'nanoid';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ITemplateResource, TemplateResources } from 'services/resources';
import { formatDate } from 'utils';

export const TABLE_HEADERS = [
  i18n.t('name', { ns: 'page:templates' }),
  i18n.t('created-at', { ns: 'page:templates' }),
  i18n.t('updated-at', { ns: 'page:templates' }),
];

export const Templates: React.FC = (): JSX.Element => {
  const { data: templates, isLoading } =
    useFetch<ITemplateResource>(TemplateResources);

  const { t } = useTranslation('page:templates');

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1 className="mb-2">{t('title')}</H1>

      <H2 className="mb-4 lg:mb-8">{t('subtitle')}</H2>

      <Table fallbackRows={10} headers={TABLE_HEADERS} isLoading={isLoading}>
        {templates?.results?.map((item: ITemplateResource) => (
          <T.Tr key={nanoid()}>
            <T.Td>{item?.name}</T.Td>
            <T.Td>{formatDate(item?.created_at)}</T.Td>
            <T.Td>{formatDate(item?.updated_at)}</T.Td>
          </T.Tr>
        ))}
      </Table>
    </>
  );
};
