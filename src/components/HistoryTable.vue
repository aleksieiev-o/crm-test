<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'amount' | locale }}</th>
      <th>{{ 'date' | locale }}</th>
      <th>{{ 'category' | locale }}</th>
      <th>{{ 'type' | locale }}</th>
      <th>{{ 'open' | locale }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(item, key) of list" :key="key">
      <td>{{ key + 1 }}</td>
      <td>{{ item.amount | course('RUB') }}</td>
      <td>{{ item.date | date('datetime') }}</td>
      <td>{{ item.categoryName }}</td>
      <td>
        <span class="white-text badge" :class="[item.typeClass]">{{ item.typeText }}</span>
      </td>
      <td>
        <router-link
          :to="`/detail/${item.id}`"
          tag="button"
          class="btn-small btn">
          <i class="material-icons">open_in_new</i>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    list: {
      type: Array,
      default() {
        return [{}]
      },
    },
  },
}
</script>
