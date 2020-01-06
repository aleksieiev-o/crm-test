<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'edit' | locale }}</h4>
      </div>

      <form @submit.prevent="editCategory">
        <div class="input-field">
          <select ref="select" v-model="currentCategory">
            <option value="" disabled selected>{{ 'categories_title' | locale }}</option>
            <option
              v-for="(item, key) of categories"
              :value="item.id"
              :key="key">{{ item.name }}
            </option>
          </select>
          <label>{{ 'category' | locale }}</label>
        </div>

        <div class="input-field">
          <input
            id="editName"
            type="text"
            v-model="name"
            :class="{ invalid: validateName }"
          >
          <label for="editName">{{ 'title' | locale }}</label>
          <span
            v-if="validateName"
            class="helper-text invalid">{{ 'input_category_validate' | locale }}</span>
        </div>

        <div class="input-field">
          <input
            id="editLimit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: validateLimit }"
          >
          <label for="editLimit">{{ 'limit' | locale }}</label>
          <span
            v-if="validateLimit"
            class="helper-text invalid">
            {{ 'input_limit_validate' | locale }} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'btn_update' | locale }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'CategoriesEdit',
  validations: {
    name: { required },
    limit: { minValue: minValue(100) },
  },
  created() {
    const { id, name, limit } = this.categories[0]
    this.currentCategory = id
    this.name = name
    this.limit = limit
  },
  mounted() {
    /* eslint-disable no-undef */
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
    /* eslint-enable */
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [
          {
            name: '',
            limit: 100,
            id: 'id',
          },
        ]
      },
    },
  },
  methods: {
    async editCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('updateCategory', {
          id: this.currentCategory,
          name: this.name,
          limit: this.limit,
        })
        this.$message('Категория обновлена')
      } catch (e) {}
    },
  },
  computed: {
    validateName() {
      return this.$v.name.$dirty && !this.$v.name.required
    },
    validateLimit() {
      return this.$v.limit.$dirty && !this.$v.limit.minValue
    },
  },
  data: () => ({
    select: null,
    name: '',
    limit: 100,
    currentCategory: null,
  }),
  watch: {
    currentCategory(id) {
      const { name, limit } = this.categories.find(item => item.id === id)
      this.name = name
      this.limit = limit
    },
  },
}
</script>
