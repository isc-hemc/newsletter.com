import { IMachineContext } from './machine.context';

/**
 * Enum for the machine nodes.
 * @readonly
 * @enum {string}
 */
export enum MachineNodes {
  IDLE = 'IDLE',
  BUILDER = 'BUILDER',
  TEMPLATE = 'TEMPLATE',
  RECIPIENTS = 'RECIPIENTS',
  NEWSLETTER = 'NEWSLETTER',
  REVIEW = 'REVIEW',
  RESULT = 'RESULT',
  CREATE_NEWSLETTER = 'CREATE_NEWSLETTER',
  SUBMIT_NEWSLETTER = 'SUBMIT_NEWSLETTER',
}

/**
 * Enum for the machine services.
 * @readonly
 * @enum {string}
 */
export enum MachineServices {
  CREATE_TEMPLATE = 'CREATE_TEMPLATE',
  CREATE_RECIPIENTS = 'CREATE_RECIPIENTS',
  CREATE_NEWSLETTER = 'CREATE_NEWSLETTER',
  SUBMIT_NEWSLETTER = 'SUBMIT_NEWSLETTER',
}

/**
 * Enum for the machine actions.
 * @readonly
 * @enum {string}
 */
export enum MachineActions {
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
  UPDATE_CONTEXT = 'UPDATE_CONTEXT',
}

/**
 * Events definition that will help the machine to decide to which node move.
 */
export interface MachineEvents extends IMachineContext {
  /**
   * Binary representation of a PDF or PNG file, this value is temporal.
   */
  attachment: File;
  /**
   * Newsletter subject message, this value is temporal.
   */
  subject: string;
  /**
   * Foreign key of a template registry, this value is temporal.
   */
  template_id: string;
  /**
   * Machine valid events.
   */
  type: 'BACK' | 'MANUAL_SETUP' | 'NEXT' | 'QUICK_START';
}
