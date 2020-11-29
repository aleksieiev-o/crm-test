import store from '../../store';
import ru from '../../locale/ru';
import en from '../../locale/en';

const locales = {
  'ru-RU': ru,
  'en-US': en,
};

// eslint-disable-next-line func-names
export default function (key) {
  let loc = null;
  if (store.getters.getUInfo !== null) {
    loc = store.getters.getUInfo.locale;
  } else {
    loc = store.getters.getLastLocale;
  }
  return locales[loc][key] || `[Localize error]: key ${key} not found`;
}
