<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
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
    this.loading = false
    this.createPagination(this.modifiedRecords)
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
}
</script>
