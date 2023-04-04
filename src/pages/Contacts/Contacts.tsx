import { Button, EmptySearch } from 'components/elements';
import { Input } from 'components/inputs';
import { Table } from 'components/layout';
import { BaseTable as T } from 'components/modules';
import { H1, H2 } from 'components/typography';
import { useFetch, useToggle } from 'hooks';
import { i18n } from 'locales';
import fp from 'lodash/fp';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { ContactResources, IContactResource } from 'services/resources';
import { formatDate } from 'utils';

import {
  SingleContactForm,
  SingleContactFormValues,
} from './components/SingleContactForm';

export const TABLE_HEADERS = [
  i18n.t('name', { ns: 'page:contacts' }),
  i18n.t('last-name', { ns: 'page:contacts' }),
  i18n.t('email', { ns: 'page:contacts' }),
  i18n.t('created-at', { ns: 'page:contacts' }),
  i18n.t('updated-at', { ns: 'page:contacts' }),
];

export const Contacts = (): JSX.Element => {
  const [isOpen, toggle] = useToggle();

  const { data: contacts, isLoading } =
    useFetch<IContactResource>(ContactResources);

  const { t } = useTranslation('page:contacts');

  const handleOnSubmit = useCallback(async (v: SingleContactFormValues) => {
    // eslint-disable-next-line no-console
    console.info(v);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1 className="mb-2">{t('heading')}</H1>
      <H2 className="mb-4 lg:mb-8">{t('subheading')}</H2>

      <div className="mb-4 flex flex-col-reverse justify-between gap-4 lg:flex-row">
        <Input
          className="lg:max-w-[320px]"
          placeholder={t('search-by.email')}
        />
        <Button
          className="h-10 self-end px-4 text-xs"
          colorScheme="secondary"
          onClick={() => toggle()}
          rightIcon={<FaPlus size={10} />}
          variant="outline"
        >
          {t('button.create')}
        </Button>
      </div>

      {fp.isEmpty(contacts?.results) ? (
        <EmptySearch />
      ) : (
        <Table
          fallbackRows={10}
          headers={TABLE_HEADERS}
          isLoading={isLoading}
          siblings={1}
        >
          {contacts?.results?.map((item: IContactResource) => (
            <T.Tr key={nanoid()}>
              <T.Td>{item?.name}</T.Td>
              <T.Td>{item?.last_name}</T.Td>
              <T.Td>{item?.email}</T.Td>
              <T.Td>{formatDate(item?.created_at)}</T.Td>
              <T.Td>{formatDate(item?.updated_at)}</T.Td>
            </T.Tr>
          ))}
        </Table>
      )}

      <SingleContactForm
        isCentered
        isOpen={isOpen}
        onClose={toggle}
        onSubmit={handleOnSubmit}
        size="lg"
      />
    </>
  );
};
