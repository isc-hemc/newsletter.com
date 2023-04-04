import { format, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import fp from 'lodash/fp';

export const DEFAULT_DATE_FORMAT = "d 'de' MMMM yyyy";

export const formatDate = (
  s?: number | string,
  f: string = DEFAULT_DATE_FORMAT,
): string => {
  if (fp.isNil(s)) return '-';
  return format(new Date(parseISO(s as string)), f, {
    locale: es,
  });
};
