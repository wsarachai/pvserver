import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import backend from 'i18next-xhr-backend';

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: process.env.REACT_APP_PATH_LOCALES,
    },
    fallbackLng: 'th',
    lng: 'th',
    ns: ['labels', 'validation', 'menu'],
    defaultNS: 'labels',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },
    react: {
      wait: true,
      omitBoundRerender: false,
    },
  });

export default i18n;
