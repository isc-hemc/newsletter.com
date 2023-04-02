import { EmptySearch } from 'components/elements';
import { Input } from 'components/inputs';
import { Modal } from 'components/layout';
import { H1, H2 } from 'components/typography';
import { useToggle } from 'hooks';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const Contacts = (): JSX.Element => {
  const [isOpen, toggle] = useToggle();

  const { t } = useTranslation('page:contacts');

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

      <EmptySearch />

      <Modal isCentered isOpen={isOpen} onClose={toggle} size="lg">
        <div className="px-6 py-4">
          <H1 className="!text-2xl">{t('actions.add-one')}</H1>
        </div>

        <div className="h-48 border-y-2 border-gray-200 bg-[#F6F8FB] px-6 py-4" />

        <div className="flex items-center justify-between px-6 py-4">
          <button type="button">Cancel</button>
          <button type="button">Submit</button>
        </div>
      </Modal>
    </>
  );
};
