import { IMachineContext } from './machine.context';

/**
 * Events definition that will help the machine to decide to which node move.
 * Also it will store useful data comming from the event in order to be handled
 * in actions or services, this data will not be stored in the context unless
 * it is the intention of the developer.
 */
export interface IMachineEvents extends IMachineContext {
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
