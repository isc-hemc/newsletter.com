import { useInterpret } from '@xstate/react';
import { NewsletterContext } from 'contexts';
import { Machine } from 'machine';

export const Newsletter: React.FC<React.PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const interpret = useInterpret(Machine);

  return (
    <NewsletterContext.Provider value={interpret}>
      {children}
    </NewsletterContext.Provider>
  );
};
