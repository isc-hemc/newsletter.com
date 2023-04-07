import { FileInput, Input } from 'components/inputs';
import { H1, H2 } from 'components/typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiContactsBook2Line } from 'react-icons/ri';

export const RecipientsScreen = (): JSX.Element => {
  const [file, setFile] = useState<File>();

  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('screen.recipients.title')}
      </H1>

      <H2 className="mb-8 text-center">{t('screen.recipients.subtitle')}</H2>

      <div className="flex gap-8">
        <form className="flex flex-[2] flex-col gap-4">
          <Input placeholder="Nombre de la importación..." />

          <FileInput accept=".csv" icon="csv" onChange={setFile} value={file} />
        </form>

        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center lg:gap-4">
          <RiContactsBook2Line color="#00C7B1" size={180} />
          <p className="text-justify text-xs font-medium text-primary-500">
            {t('screen.recipients.terms')}
          </p>
        </div>
      </div>
    </>
  );
};
