<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"/>
    </div>

    <pre-loader v-if="loading"/>

    <p
      v-else-if="!getRecords.length"
      class="center">
      Записей нет
      <router-link to="/record">
        Создать запись
      </router-link>
    </p>

    <section v-else>
      <history-table
      :list="currentPages"/>

      <paginate-mixin
        class="center"
        v-model="page"
        :page-count="pageCount"
        :click-handler="paginateHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"/>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Pie } from 'vue-chartjs'
import paginationMixin from '../helpers/mixins/paginationMixin'
import HistoryTable from '../components/HistoryTable'

export default {
  name: 'AppHistory',
  components: {
    HistoryTable,
  },
  async mounted() {
    await this.$store.dispatch('loadCategories')
    await this.$store.dispatch('loadRecords')

    this.createPagination(this.modifiedRecords)

    this.createChart()

    this.loading = false
  },
  methods: {
    createChart() {
      this.renderChart({
        labels: this.getCategories.map(item => item.name),
        datasets: [{
          label: 'Расходы по категориям',
          data: this.getCategories.map(item => this.getRecords.reduce((total, val) => {
            if (val.categoryId === item.id && val.type === 'outcome') {
              // eslint-disable-next-line no-param-reassign
              total += +val.amount
            }
            return total
          }, 0)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      })
    },
  },
  computed: {
    ...mapGetters({
      getCategories: 'getCategories',
      getRecords: 'getRecords',
    }),
    modifiedRecords() {
      if (this.getRecords && this.getCategories) {
        return this.getRecords.map(item => ({
          ...item,
          categoryName: this.getCategories.find(cat => cat.id === item.categoryId).name,
          typeClass: item.type === 'income' ? 'teal' : 'red',
          typeText: item.type === 'income' ? 'Доход' : 'Расход',
        }))
      }
      return null
    },
  },
  data: () => ({
    loading: true,
  }),
  mixins: [
    paginationMixin,
  ],
  extends: Pie,
}
</script>
