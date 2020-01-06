<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profile_title' | locale }}</h3>
    </div>

    <form class="form" @submit.prevent="editUserName">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: validateName }"
        >
        <label for="description">{{ 'input_name' | locale }}</label>
        <span
          v-if="validateName"
          class="helper-text invalid">
          {{ 'input_name_validate' | locale }}
        </span>
      </div>

      <div class="language-switcher">
        <h6>{{ 'language_title' | locale }}</h6>

        <div class="switch">
          <label>
            English
            <input type="checkbox" v-model="isRuLocale">
            <span class="lever"></span>
            Русский
          </label>
        </div>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        :disabled="pending">
        {{ 'btn_update' | locale }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AppProfile',
  validations: {
    name: { required },
  },
  mounted() {
    /* eslint-disable no-undef */
    this.$nextTick()
      .then(() => {
        M.updateTextFields()
      })
    /* eslint-enable */

    this.name = this.getUInfo.name
    this.isRuLocale = this.getUInfo.locale === 'ru-RU'
  },
  methods: {
    async editUserName() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        this.pending = true
        await this.$store.dispatch('updateInfo', {
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        })
        this.$message('Имя пользователя обновлено')
        this.pending = false
      } catch (e) {}
    },
  },
  computed: {
    ...mapGetters({
      getUInfo: 'getUInfo',
    }),
    validateName() {
      return this.$v.name.$dirty && !this.$v.name.required
    },
  },
  data: () => ({
    name: '',
    isRuLocale: true,
    pending: false,
  }),
}
</script>

<style lang="scss">
  .language-switcher {
    margin-bottom: 24px;
  }

  .switch label .lever:after {
    background-color: #ffb300;
  }
</style>
