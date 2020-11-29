import store from '../../store';

export default function courseFilter(val, currency = 'RUB') {
  const locale = store.getters.getUInfo.locale || 'ru-RU';

  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(val);
}
