
export default function courseFilter(val, currency = 'RUB') {
  return Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
  }).format(val)
}
