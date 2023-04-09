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
  CREATE_TEMPLATE = 'CREATE_TEMPLATE',
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
