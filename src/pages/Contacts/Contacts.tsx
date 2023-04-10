import { Button } from 'components/elements';
import { Input } from 'components/inputs';
import { Table } from 'components/layout';
import { BaseTable as T } from 'components/modules';
import { H1, H2 } from 'components/typography';
import { useFetch, usePost, useToggle } from 'hooks';
import { i18n } from 'locales';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import {
  ContactResources,
  IContactPayload,
  IContactResource,
} from 'services/resources';
import { formatDate } from 'utils';

import { SingleContactForm } from './components/SingleContactForm';

export const TABLE_HEADERS = [
  i18n.t('name', { ns: 'page:contacts' }),
  i18n.t('last-name', { ns: 'page:contacts' }),
  i18n.t('email', { ns: 'page:contacts' }),
  i18n.t('created-at', { ns: 'page:contacts' }),
  i18n.t('updated-at', { ns: 'page:contacts' }),
];

export const Contacts = (): JSX.Element => {
  const [isOpen, toggle] = useToggle();

  const {
    data: contacts,
    isLoading,
    refetch,
  } = useFetch<IContactResource>(ContactResources);

  const { mutateAsync, isLoading: isPosting } =
    usePost<IContactResource>(ContactResources);

  const { t } = useTranslation('page:contacts');

  const handleOnSubmit = useCallback(async (v: IContactPayload) => {
    await mutateAsync(v);
    await refetch();
    toggle();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <H1 className="mb-2">{t('title')}</H1>

      <H2 className="mb-4 lg:mb-8">{t('subtitle')}</H2>

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

      <Table fallbackRows={10} headers={TABLE_HEADERS} isLoading={isLoading}>
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

      <SingleContactForm
        isCentered
        isLoading={isPosting}
        isOpen={isOpen}
        onClose={toggle}
        onSubmit={handleOnSubmit}
        size="lg"
      />
    </>
  );
};
