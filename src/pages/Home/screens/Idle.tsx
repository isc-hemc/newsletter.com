import { useActor, useSelector } from '@xstate/react';
import { NewsletterContext } from 'contexts';
import { MachineNodes } from 'machine';
import { useContext } from 'react';

export const IdleScreen: React.FC = (): JSX.Element => {
  const context = useContext(NewsletterContext);

  const isInitialNode = useSelector(context, (state) =>
    state?.matches(MachineNodes.IDLE),
  );

  const [state] = useActor(context);

  return (
    <>
      <pre>{JSON.stringify(state?.value, null, 2)}</pre>

      {isInitialNode ? (
        <div className="mt-4 flex justify-between gap-2">
          <button onClick={() => context?.send('MANUAL_SETUP')} type="button">
            MANUAL_SETUP
          </button>
          <button onClick={() => context?.send('QUICK_START')} type="button">
            QUICK_START
          </button>
        </div>
      ) : null}
    </>
  );
};
