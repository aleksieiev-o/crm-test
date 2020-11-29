<template>
  <div>
    <div class="page-title">
      <h3>{{ 'categories_title' | locale }}</h3>
    </div>

    <section>
      <div class="row">
        <pre-loader v-if="loading"/>

        <template v-else>
          <categories-create
            @updateCategories="updateCategories"/>

          <categories-edit
            v-if="getCategories.length > 0"
            :categories="getCategories"/>

          <p class="center" v-else>{{ 'not_categories' | locale }}</p>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CategoriesCreate from '../components/CategoriesCreate';
import CategoriesEdit from '../components/CategoriesEdit';
import localeFilter from '../helpers/filters/localeFilter';

export default {
  name: 'AppCategories',
  components: {
    CategoriesCreate,
    CategoriesEdit,
  },
  async mounted() {
    await this.$store.dispatch('loadCategories');
    this.loading = false;
  },
  methods: {
    async updateCategories() {
      this.loading = true;
      await this.$store.dispatch('loadCategories');
      this.loading = false;
      this.$message(localeFilter('category_created'));
    },
  },
  computed: {
    ...mapGetters({
      getCategories: 'getCategories',
    }),
  },
  data: () => ({
    loading: true,
  }),
  metaInfo() {
    return {
      title: this.$title('categories_title'),
    };
  },
};
</script>
