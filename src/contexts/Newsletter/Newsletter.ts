/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMachineContext, IMachineEvents } from 'machine';
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
  IMachineEvents,
  {
    value: any;
    context: IMachineContext;
  },
  ResolveTypegenMeta<
    TypegenDisabled,
    IMachineEvents,
    BaseActionObject,
    ServiceMap
  >
>;

export const Newsletter = createContext({} as INewsletterProps);
