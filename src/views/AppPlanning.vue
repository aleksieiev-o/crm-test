<template>
  <div>
    <div class="page-title">
      <h3>{{ 'planning_title' | locale }}</h3>
      <h4>{{ getUInfo.bill | course }}</h4>
    </div>

    <pre-loader v-if="loading"/>

    <p
      v-else-if="!getCategories.length"
      class="center">
      {{ 'not_categories' | locale }}
      <router-link to="/categories">
        {{ 'create_category' | locale }}
      </router-link>
    </p>

    <section v-else>
      <div v-for="(item, key) of transformData" :key="key">
        <p>
          <strong>{{ item.name }}:</strong>
          {{ item.spend | course }} {{ 'of' | locale }} {{ item.limit | course }}
        </p>
        <div class="progress">
          <div
            v-tooltip="item.tooltip"
            class="determinate"
            :class="[item.progressColor]"
            :style="{ width: `${item.progressPersent}%` }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import courseFilter from '../helpers/filters/courseFilter'
import localeFilter from '../helpers/filters/localeFilter'

export default {
  name: 'AppPlanning',
  async mounted() {
    await this.$store.dispatch('loadRecords')
    await this.$store.dispatch('loadCategories')

    this.loading = false
  },
  computed: {
    ...mapGetters({
      getRecords: 'getRecords',
      getCategories: 'getCategories',
      getUInfo: 'getUInfo',
    }),
    transformData() {
      return this.getCategories && this.getRecords
        ? this.getCategories.map((item) => {
          const spend = this.getRecords
            .filter(rec => rec.categoryId === item.id)
            .filter(rec => rec.type === 'outcome')
          // eslint-disable-next-line no-param-reassign,no-return-assign
            .reduce((total, record) => total += parseInt(record.amount, 10), 0)

          const persent = 100 * spend / item.limit
          const progressPersent = persent > 100 ? 100 : persent
          // eslint-disable-next-line no-nested-ternary
          const progressColor = persent < 60 ? 'teal' : persent < 100 ? 'amber' : 'red'
          const tooltipVal = item.limit - spend
          const tooltip = `${tooltipVal < 0 ? localeFilter('excess') : localeFilter('left')} ${courseFilter(Math.abs(tooltipVal))}`

          return {
            ...item, progressPersent, progressColor, spend, tooltip,
          }
        }) : null
    },
  },
  data: () => ({
    loading: true,
  }),
  metaInfo() {
    return {
      title: this.$title('planning_title'),
    }
  },
}
</script>
