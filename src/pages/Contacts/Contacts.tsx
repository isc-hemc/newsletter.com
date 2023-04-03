import { EmptySearch } from 'components/elements';
import { Input } from 'components/inputs';
import { H1, H2 } from 'components/typography';
import { useFetch, useToggle } from 'hooks';
import fp from 'lodash/fp';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ContactResources, IContactResource } from 'services/resources';

import {
  SingleContactForm,
  SingleContactFormValues,
} from './components/SingleContactForm';

export const Contacts = (): JSX.Element => {
  const [isOpen, toggle] = useToggle();

  const { data: contacts } = useFetch<IContactResource>(ContactResources);

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
      <H2 className="mb-14">{t('subheading')}</H2>

      <div className="flex justify-between">
        <Input className="md:w-[320px]" placeholder={t('search-by.email')} />

        <button onClick={() => toggle()} type="button">
          +
        </button>
      </div>

      {fp.isEmpty(contacts?.results) ? (
        <EmptySearch />
      ) : (
        <div className="">
          <pre>{JSON.stringify(contacts?.results, null, 2)}</pre>
        </div>
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
