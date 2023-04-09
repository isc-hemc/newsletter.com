import { Button } from 'components/elements';
import { H1, H2 } from 'components/typography';
import { useTranslation } from 'react-i18next';
import { RiMailSendLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const ResultsNode = (): JSX.Element => {
  const navigate = useNavigate();

  const { t } = useTranslation('page:home');

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <H1 className="mb-2 text-center uppercase">{t('node.results.title')}</H1>

      <H2 className="text-center">{t('node.results.subtitle')}</H2>

      <RiMailSendLine className="my-8" color="#00C7B1" size={160} />

      <Button
        className="self-center px-28 py-2"
        colorScheme="tertiary"
        onClick={() => navigate(0)}
        type="button"
      >
        {t('button.start')}
      </Button>
    </div>
  );
};
