import { format, parse, startOfWeek, getDay } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';

import { es, enUS, fr } from 'date-fns/locale';



// TODO: implementaer soporte multiple idiomas

const locales = {
  'es': es,
  'en': enUS,
  'fr': fr,
};

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
