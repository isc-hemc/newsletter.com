import { IMachineContext } from './machine.context';

/**
 * Events definition that will help the machine to decide to which node move.
 * Also it will store useful data comming from the event in order to be handled
 * in actions or services, this data will not be stored in the context unless
 * it is the intention of the developer. All the data in an event object is
 * temporal and its life-cycle is during its transition.
 */
export interface IMachineEvents extends IMachineContext {
  /**
   * Binary representation of a PDF or PNG file.
   */
  attachment: File;
  /**
   * Template content, it can be HTML code.
   */
  content: string;
  /**
   * File with a bunch of contacts.
   */
  csv: File;
  /**
   * Template or recipients CSV name.
   */
  name: string;
  /**
   * Foreign key of a newsletter-type registry.
   */
  newsletter_type_id: string;
  /**
   * Newsletter subject message.
   */
  subject: string;
  /**
   * Foreign key of a template registry.
   */
  template_id: string;
  /**
   * Machine valid events.
   */
  type: 'BACK' | 'MANUAL_SETUP' | 'NEXT' | 'QUICK_START';
}
