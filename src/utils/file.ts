import fp from 'lodash/fp';

export const CSV_FORMAT = 'text/csv';

export const PDF_FORMAT = 'application/pdf';

export const PNG_FORMAT = 'image/png';

export const isValidFileFormat = fp.curry((formats: string[], value: string) =>
  fp.includes(value)(formats),
);

export const isValidFileSize = fp.curry(
  (size: number, FILE_SIZE = 5 * 1024 * 1024) => (size as number) <= FILE_SIZE,
);
