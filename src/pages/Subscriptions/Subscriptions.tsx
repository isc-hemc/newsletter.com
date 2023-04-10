import { css, cx } from '@emotion/css';
import { H1, H2 } from 'components/typography';
import { useFetch } from 'hooks';
import fp from 'lodash/fp';
import { useCallback, useMemo } from 'react';
import { use100vh } from 'react-div-100vh';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FadeLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import {
  INewsletterTypeResource,
  NewsletterTypeResources as NTR,
} from 'services/resources';

import { Form, IFormValue } from './components/Form';
import { Header } from './components/Header';
import { useFetchContactSubscriptions, useUpdateSubscriptions } from './hooks';

export const Subscriptions = (): JSX.Element => {
  const { data: subs, isLoading: isLoadingSubscriptions } =
    useFetchContactSubscriptions();

  const { data: nts, isLoading: isLoadingNewsletterTypes } =
    useFetch<INewsletterTypeResource>(NTR);

  const { mutateAsync } = useUpdateSubscriptions();

  const { t } = useTranslation('page:subscriptions');

  const height = use100vh();

  const options = useMemo(
    () =>
      nts?.results?.map((x) => {
        const sub = subs?.results?.find((z) => z?.newsletter_type_id === x?.id);
        return { id: sub?.id, label: x?.name, value: sub?.is_active };
      }),
    [subs?.results, nts?.results],
  );

  const defaultValues = useMemo(
    () =>
      options?.reduce(
        (obj, item) => ({
          ...obj,
          [item?.id as string]: item?.value,
        }),
        {},
      ),
    [options],
  );

  const handleOnSubmit = useCallback(async (v: IFormValue) => {
    fp.entries(v)?.map(async ([subscription_id, is_active]) => {
      await mutateAsync({ params: { is_active }, subscription_id });
    });
    toast.success(t('patch.success'));
  }, []);

  const HEIGHT_CLASS = useMemo(
    () =>
      css`
        min-height: ${height}px;
      `,
    [height],
  );

  return (
    <>
      <Helmet>
        <title>{t('helmet')}</title>
      </Helmet>

      <main className={cx('relative flex flex-col bg-[#F6F8FB]', HEIGHT_CLASS)}>
        <Header />

        {isLoadingSubscriptions || isLoadingNewsletterTypes ? (
          <FadeLoader className="!fixed !inset-1/2" color="#00C7B1" />
        ) : (
          <section className="flex w-full max-w-3xl flex-1 flex-col self-center px-4 py-8">
            <H1 className="mb-2 text-center uppercase">{t('title')}</H1>

            <H2 className="mb-8 text-center">{t('subtitle')}</H2>

            <Form
              defaultValues={defaultValues}
              onSubmit={handleOnSubmit}
              options={options}
            />
          </section>
        )}
      </main>
    </>
  );
};
