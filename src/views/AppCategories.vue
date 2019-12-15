<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>

    <section>
      <div class="row">
        <pre-loader v-if="loading"/>

        <template v-else>
          <categories-create
            @updateCategoryList="updateCategoryList($event)"/>

          <categories-edit
            v-if="getCategories.length > 0"
            :categories="getCategories"/>

          <p class="center" v-else>Категорий нет</p>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoriesCreate from '../components/CategoriesCreate'
import CategoriesEdit from '../components/CategoriesEdit'

export default {
  name: 'UserLogin',
  components: {
    CategoriesCreate,
    CategoriesEdit,
  },
  async mounted() {
    await this.$store.dispatch('loadCategories')
    this.loading = false
  },
  methods: {
    updateCategoryList(val) {
      this.loading = true
      this.categoryList.push(val)
      this.loading = false
    },
  },
  computed: {
    ...mapGetters({
      getCategories: 'getCategories',
    }),
  },
  data: () => ({
    categoryList: [],
    loading: true,
  }),
}
</script>
