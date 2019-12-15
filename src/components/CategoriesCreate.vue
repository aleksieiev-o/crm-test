<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createCategory">
        <div class="input-field">
          <input
            id="createName"
            type="text"
            v-model="name"
            :class="{ invalid: validateName }"
          >
          <label for="createName">Название</label>
          <span
            v-if="validateName"
            class="helper-text invalid">Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="createLimit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: validateLimit }"
          >
          <label for="createLimit">Лимит</label>
          <span
            v-if="validateLimit"
            class="helper-text invalid">
            Минимальное значение {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'CategoriesCreate',
  validations: {
    name: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  methods: {
    async createCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          name: this.name,
          limit: this.limit,
        })
        this.resetCategoryForm(category)
      } catch (e) {}
    },
    resetCategoryForm(val) {
      this.name = ''
      this.limit = 100
      this.$v.reset()
      this.$message('Категория создана')
      this.$emit('updateCategoryList', val)
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
    name: '',
    limit: 100,
  }),
}
</script>
