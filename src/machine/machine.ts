/* eslint-disable @typescript-eslint/no-explicit-any */
import { i18n } from 'locales';
import fp from 'lodash/fp';
import { toast as t } from 'react-toastify';
import {
  BulkResources,
  IBulkPayload,
  INewsletterPayload,
  NewsletterResources,
  TemplateResources,
} from 'services/resources';
import { assign, createMachine } from 'xstate';

import { IMachineContext, INITIAL_CONTEXT } from './machine.context';
import { IMachineEvents } from './machine.events';
import {
  MachineActions,
  MachineNodes,
  MachineServices,
} from './machine.helpers';

export const Machine = createMachine<IMachineContext, IMachineEvents>(
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
            target: MachineNodes.CREATE_TEMPLATE,
          },
        },
      },
      [MachineNodes.CREATE_TEMPLATE]: {
        invoke: {
          id: 'CREATE_TEMPLATE',
          onDone: {
            actions: [MachineActions.UPDATE_CONTEXT, MachineActions.SUCCESS],
            target: MachineNodes.RECIPIENTS,
          },
          onError: {
            actions: MachineActions.FAILURE,
            target: MachineNodes.TEMPLATE,
          },
          src: MachineServices.CREATE_TEMPLATE,
        },
      },
      [MachineNodes.RECIPIENTS]: {
        on: {
          BACK: {
            target: MachineNodes.TEMPLATE,
          },
          NEXT: {
            target: MachineNodes.CREATE_RECIPIENTS,
          },
        },
      },
      [MachineNodes.CREATE_RECIPIENTS]: {
        invoke: {
          id: 'CREATE_RECIPIENTS',
          onDone: {
            actions: [MachineActions.UPDATE_CONTEXT, MachineActions.SUCCESS],
            target: MachineNodes.NEWSLETTER,
          },
          onError: {
            actions: MachineActions.FAILURE,
            target: MachineNodes.RECIPIENTS,
          },
          src: MachineServices.CREATE_RECIPIENTS,
        },
      },
      [MachineNodes.NEWSLETTER]: {
        on: {
          BACK: {
            target: MachineNodes.RECIPIENTS,
          },
          NEXT: {
            target: MachineNodes.CREATE_NEWSLETTER,
          },
        },
      },
      [MachineNodes.CREATE_NEWSLETTER]: {
        invoke: {
          id: 'CREATE_NEWSLETTER',
          onDone: {
            actions: [MachineActions.UPDATE_CONTEXT, MachineActions.SUCCESS],
            target: MachineNodes.REVIEW,
          },
          onError: {
            actions: MachineActions.FAILURE,
            target: MachineNodes.BUILDER,
          },
          src: MachineServices.CREATE_NEWSLETTER,
        },
      },
      [MachineNodes.REVIEW]: {
        on: {
          NEXT: {
            target: MachineNodes.SUBMIT_NEWSLETTER,
          },
        },
      },
      [MachineNodes.SUBMIT_NEWSLETTER]: {
        invoke: {
          id: 'SUBMIT_NEWSLETTER',
          onDone: {
            actions: MachineActions.SUCCESS,
            target: MachineNodes.RESULT,
          },
          onError: {
            actions: MachineActions.FAILURE,
            target: MachineNodes.REVIEW,
          },
          src: MachineServices.SUBMIT_NEWSLETTER,
        },
      },
      [MachineNodes.RESULT]: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      [MachineActions.FAILURE]: assign((ctx, evt) => {
        const STATUS = (evt as any)?.data?.response?.status;
        t.error(i18n.t(`api.default.status-code.${STATUS}`, { ns: 'errors' }));
        return { ...ctx, error: true };
      }),
      [MachineActions.SUCCESS]: assign((ctx) => ({ ...ctx, error: false })),
      [MachineActions.UPDATE_CONTEXT]: assign((ctx, evt) => ({
        ...ctx,
        ...fp.compose(fp.get('data'), fp.omit('type'))(evt),
      })),
    },
    services: {
      [MachineServices.CREATE_TEMPLATE]: async (_ctx, { content, name }) => {
        if (!name) return {};
        const { data } = await TemplateResources.post({ content, name });
        return { template_id: data?.id };
      },
      [MachineServices.CREATE_RECIPIENTS]: async (_ctx, { csv, name }) => {
        if (!name || !csv) return {};
        const payload = new FormData();
        payload.append('name', name);
        payload.append('csv', csv, csv.name);
        const { data } = await BulkResources.post(payload as IBulkPayload);
        return { bulk_id: data?.id };
      },
      [MachineServices.CREATE_NEWSLETTER]: async (ctx, evt) => {
        const p = new FormData();

        p.append('subject', evt?.subject);
        p.append('newsletter_type_id', evt?.newsletter_type_id);

        if (ctx?.template_id) p.append('template_id', ctx.template_id);
        if (evt?.template_id) p.append('template_id', evt.template_id);
        if (evt?.attachment) {
          p.append('attachment', evt.attachment, evt.attachment?.name);
        }

        const res = await NewsletterResources.post(p as INewsletterPayload);

        return {
          bulk_id: evt?.bulk_id ? evt?.bulk_id : ctx?.bulk_id,
          newsletter_id: res?.data?.id,
        };
      },

      [MachineServices.SUBMIT_NEWSLETTER]: async (ctx) => {
        const { newsletter_id: newsletter, bulk_id } = ctx;

        await NewsletterResources.submission(newsletter as string, { bulk_id });
      },
    },
  },
);
