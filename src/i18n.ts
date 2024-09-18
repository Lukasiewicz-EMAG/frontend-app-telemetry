import i18next from 'i18next';
import en from './locales/en/en.json';
import pl from './locales/pl/pl.json';

i18next.init({
  debug: true,
  defaultNS: 'en',
  resources: {
    en: en,
    pl: pl,
  },
});

export default i18next;
