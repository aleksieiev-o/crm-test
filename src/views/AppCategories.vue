<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>

    <section>
      <div class="row">
        <template>
          <categories-create @createCategory="updateCategoryList($event)"/>

          <categories-edit/>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '../components/CategoriesCreate'
import CategoriesEdit from '../components/CategoriesEdit'

export default {
  name: 'UserLogin',
  components: {
    CategoriesCreate,
    CategoriesEdit,
  },
  methods: {
    updateCategoryList(val) {
      this.categoryList.push(val)
    },
  },
  data: () => ({
    categoryList: [],
  }),
}
</script>
