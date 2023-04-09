import fp from 'lodash/fp';
import { assign, createMachine } from 'xstate';

import { IMachineContext, INITIAL_CONTEXT } from './machine.context';
import {
  MachineActions,
  MachineEvents,
  MachineNodes,
  MachineServices,
} from './machine.helpers';

export const Machine = createMachine<IMachineContext, MachineEvents>(
  {
    context: INITIAL_CONTEXT,
    id: 'MACHINE',
    initial: MachineNodes.IDLE,
    states: {
      [MachineNodes.IDLE]: {
        on: {
          MANUAL_SETUP: {
            target: MachineNodes.TEMPLATE,
          },
          QUICK_START: {
            target: MachineNodes.BUILDER,
          },
        },
      },
      [MachineNodes.BUILDER]: {
        on: {
          BACK: {
            target: MachineNodes.IDLE,
          },
          NEXT: {
            target: MachineNodes.CREATE_NEWSLETTER,
          },
        },
      },
      [MachineNodes.TEMPLATE]: {
        on: {
          BACK: {
            target: MachineNodes.IDLE,
          },
          NEXT: {
            target: MachineNodes.RECIPIENTS,
          },
        },
      },
      [MachineNodes.RECIPIENTS]: {
        on: {
          BACK: {
            target: MachineNodes.TEMPLATE,
          },
          NEXT: {
            target: MachineNodes.NEWSLETTER,
          },
        },
      },
      [MachineNodes.NEWSLETTER]: {
        on: {
          BACK: {
            target: MachineNodes.RECIPIENTS,
          },
          NEXT: {
            target: MachineNodes.REVIEW,
          },
        },
      },
      [MachineNodes.CREATE_NEWSLETTER]: {
        invoke: {
          id: 'create-newsletter',
          onDone: {
            actions: MachineActions.UPDATE_CONTEXT,
            target: MachineNodes.REVIEW,
          },
          onError: {
            target: MachineNodes.BUILDER,
          },
          src: MachineServices.CREATE_NEWSLETTER,
        },
      },
      [MachineNodes.REVIEW]: {
        on: {
          NEXT: {
            target: MachineNodes.RESULT,
          },
        },
      },
      [MachineNodes.RESULT]: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      [MachineActions.UPDATE_CONTEXT]: assign((ctx, evt) => ({
        ...ctx,
        ...fp.compose(fp.get('data'), fp.omit('type'))(evt),
      })),
    },
    services: {
      [MachineServices.CREATE_NEWSLETTER]: async (ctx, evt) => ({
        newsletter_id: 'some-id',
        ...fp.pick(['attachment', 'bulk_id', 'template_id'])(evt),
      }),
    },
  },
);
