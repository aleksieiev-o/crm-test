
import store from '../../store'
import ru from '../../locale/ru'
import en from '../../locale/en'

const locales = {
  'ru-RU': ru,
  'en-US': en,
}

export default function (key) {
  const locale = store.getters.getUInfo.locale || 'ru-RU'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
