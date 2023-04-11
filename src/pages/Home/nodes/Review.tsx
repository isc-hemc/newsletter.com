import { useActor } from '@xstate/react';
import { clomp } from 'clomp';
import { Button } from 'components/elements';
import { H1, H2 } from 'components/typography';
import { NewsletterContext } from 'contexts';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BsListCheck } from 'react-icons/bs';

const Card = clomp.div`
  flex
  flex-1
  flex-col
  gap-4
  items-center
  rounded-xl
  border-2
  border-gray-200
  bg-white
  px-4
  py-8
`;

const Grid = clomp.div`
  grid
  w-full
  flex-1
  grid-cols-1
  items-center
  justify-items-center
  md:grid-cols-2
  md:px-4
`;

const H3 = clomp.h3`
  text-center
  text-sm
  font-bold
  uppercase
`;

const Text = clomp.p`
  text-center
  text-xs
  font-semibold
`;

export const ReviewNode = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const [state] = useActor(context);

  const { t } = useTranslation('page:home');

  return (
    <>
      <H1 className="mb-2 text-center uppercase">{t('node.review.title')}</H1>

      <H2 className="mb-8 text-center">{t('node.review.subtitle')}</H2>

      <Card>
        <BsListCheck color="#00C7B1" size={124} />

        <Grid>
          <H3>{t('node.review.newsletter-id')}</H3>
          <Text>{state?.context?.newsletter_id || t('node.review.na')}</Text>

          <H3>{t('node.review.template-id')}</H3>
          <Text>{state?.context?.template_id || t('node.review.na')}</Text>

          <H3>{t('node.review.audience')}</H3>
          <Text>{state?.context?.bulk_id || t('node.review.all')}</Text>
        </Grid>

        <Button
          className="self-center px-6 py-2"
          colorScheme="tertiary"
          onClick={() => context?.send('NEXT')}
        >
          {t('button.send', { ns: 'common' })}
        </Button>
      </Card>
    </>
  );
};
