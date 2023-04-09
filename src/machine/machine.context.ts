export interface IMachineContext {
  /**
   * Binary representation of a PDF or PNG file.
   */
  attachment?: File;
  /**
   * Foreign key of a bulk registry, this field is optional.
   */
  bulk_id?: string;
  /**
   * In case of an error during POST operations it will inform to the user if
   * necessary, default value is `false`.
   */
  error: boolean;
  /**
   * ID of the newsletter that will be sent to the recipients list.
   */
  newsletter_id?: string;
  /**
   * Foreign key of a template registry, this field is optional.
   */
  template_id?: string;
}

export const INITIAL_CONTEXT: IMachineContext = {
  attachment: undefined,
  bulk_id: undefined,
  error: false,
  newsletter_id: undefined,
  template_id: undefined,
};
