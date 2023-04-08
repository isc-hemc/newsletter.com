import { createMachine } from 'xstate';

import { IMachineContext, INITIAL_STATE } from './machine.context';
import { MachineEvents, MachineNodes } from './machine.helpers';

export const Machine = createMachine<IMachineContext, MachineEvents>({
  context: INITIAL_STATE,
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
          target: MachineNodes.RESULT,
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
          target: MachineNodes.RESULT,
        },
      },
    },
    [MachineNodes.RESULT]: {
      type: 'final',
    },
  },
});
