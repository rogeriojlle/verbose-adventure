import { format as _format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const format = (date: number | Date, formatStr = 'PP') => {
  return _format(date, formatStr, {
    locale: ptBR,
  });
};
