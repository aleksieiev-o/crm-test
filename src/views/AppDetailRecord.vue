<template>
  <div>
    <pre-loader v-if="loading"/>

    <div v-else-if="getRecord">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{ 'history_bread_crumbs' | locale }}
        </router-link>
        <a class="breadcrumb">
          {{ modifiedRecord.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[modifiedRecord.typeClass]">
            <div class="card-content white-text">
              <p>{{ 'input_description' | locale }}: {{ modifiedRecord.description }}</p>
              <p>{{ 'amount' | locale }}: {{ modifiedRecord.amount | course('RUB') }}</p>
              <p>{{ 'category' | locale }}: {{ modifiedRecord.categoryName }}</p>

              <small>{{ modifiedRecord.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p
      v-else
      class="center">
      <!-- eslint-disable-next-line max-len -->
      {{ 'record' | locale }} id = <strong>{{ $route.params.id }}</strong> {{ 'not_found' | locale }}.
      <router-link to="/history">
        {{ 'history_bread_crumbs' | locale }}
      </router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import localeFilter from '../helpers/filters/localeFilter'

export default {
  name: 'AppDetailRecord',
  async mounted() {
    await this.$store.dispatch('loadRecordById', this.$route.params.id)
    await this.$store.dispatch('loadCategoryById', this.getRecord.categoryId)
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
          typeText: this.getRecord.type === 'income' ? localeFilter('income') : localeFilter('expense'),
        }
      }
      return null
    },
  },
  data: () => ({
    loading: true,
  }),
  metaInfo() {
    return {
      title: this.$title('record_detail_title'),
    }
  },
}
</script>
