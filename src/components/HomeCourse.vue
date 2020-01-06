<template>
  <div class="col s12 m6 l8">
    <div class="card amber darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'bill_course' | locale }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ 'bill_currency_c' | locale }}</th>
            <th>{{ 'bill_course_c' | locale }}</th>
            <th>{{ 'bill_date_c' | locale }}</th>
          </tr>
          </thead>

          <tbody>
          <tr
            v-for="(item, key) of courses"
            :key="key">
            <td>{{ item }}</td>
            <td>{{ rates[item] }}</td>
            <td>{{ date | date('date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCourse',
  props: {
    rates: {
      type: Object,
      default: () => {},
    },
    date: {
      type: String,
      default: '',
    },
    courses: {
      type: Array,
      default() {
        return ['RUB', 'USD', 'EUR']
      },
    },
  },
}
</script>
