
export default function dateFilter(val, format = 'date') {
  const options = {}

  switch (format) {
  case 'date':
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
    break
  case 'time':
    options.hour = 'numeric'
    options.minute = 'numeric'
    options.second = 'numeric'
    break
  default:
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
    options.hour = 'numeric'
    options.minute = 'numeric'
    options.second = 'numeric'
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(val))
}
