<template>
  <div>
    <pre-loader v-if="loading"/>

    <div v-else-if="getRecord">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          {{ modifiedRecord.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[modifiedRecord.typeClass]">
            <div class="card-content white-text">
              <p>Описание: {{ modifiedRecord.description }}</p>
              <p>Сумма: {{ modifiedRecord.amount | course('RUB') }}</p>
              <p>Категория: {{ modifiedRecord.categoryName }}</p>

              <small>{{ modifiedRecord.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p
      v-else
      class="center">
      Запись id = <strong>{{ $route.params.id }}</strong> не найдена.
      <router-link to="/history">
        История
      </router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppDetailRecord',
  async mounted() {
    await this.$store.dispatch('loadCategoryById', this.$route.params.id)
    await this.$store.dispatch('loadRecordById', this.$route.params.id)
    this.loading = false
  },
  computed: {
    ...mapGetters({
      getCategory: 'getCategory',
      getRecord: 'getRecord',
    }),
    modifiedRecord() {
      if (this.getRecord && this.getCategory) {
        return {
          ...this.getRecord,
          categoryName: this.getCategory.name,
          typeClass: this.getRecord.type === 'income' ? 'teal' : 'red',
          typeText: this.getRecord.type === 'income' ? 'Доход' : 'Расход',
        }
      }
      return null
    },
  },
  data: () => ({
    loading: true,
  }),
}
</script>
