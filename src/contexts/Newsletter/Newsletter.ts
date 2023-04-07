/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMachineContext, MachineEvents } from 'machine';
import { createContext } from 'react';
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  TypegenDisabled,
} from 'xstate';

export type INewsletterProps = Interpreter<
  IMachineContext,
  any,
  MachineEvents,
  {
    value: any;
    context: IMachineContext;
  },
  ResolveTypegenMeta<
    TypegenDisabled,
    MachineEvents,
    BaseActionObject,
    ServiceMap
  >
>;

export const Newsletter = createContext({} as INewsletterProps);
