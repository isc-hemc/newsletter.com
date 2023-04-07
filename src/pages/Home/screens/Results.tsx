import { Button } from 'components/elements';
import { H1, H2 } from 'components/typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const ResultsScreen = (): JSX.Element => {
  const navigate = useNavigate();

  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">
        {t('screen.results.title')}
      </H1>
      <H2 className="text-center">{t('screen.results.subtitle')}</H2>

      <div className="flex-1" />

      <Button
        className="self-center px-12 py-2"
        onClick={() => navigate(0)}
        type="button"
      >
        {t('button.start')}
      </Button>
    </>
  );
};
