<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profile_title' | locale }}</h3>
    </div>

    <form class="form" @change="editUserInfo('lang')">
      <div class="input-field">
        <select
          ref="profileSelect"
          v-model="currentLanguage">
          <option value="" disabled selected>{{ 'input_language' | locale }}</option>
          <option
            v-for="item of localeList"
            :value="item.id"
            :disabled="pending"
            :key="item.id">
            {{ item.name }}
          </option>
        </select>
        <label>{{ 'language_title' | locale }}</label>
      </div>
    </form>

    <br>

    <form class="form" @submit.prevent="editUserInfo('name')">
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
import localeFilter from '../helpers/filters/localeFilter'

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
        this.select = M.FormSelect.init(this.$refs.profileSelect)
        M.updateTextFields()
      })
    /* eslint-enable */

    this.name = this.getUInfo.name
    this.currentLanguage = this.getUInfo.locale
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async editUserInfo(prop) {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        this.pending = true

        if (prop === 'name') {
          if (this.name === this.getUInfo.name) {
            this.$message(localeFilter('user_name_same'))
            this.pending = false
            return
          }
          await this.$store.dispatch('updateInfo', {
            name: this.name,
            locale: this.currentLanguage,
          })
          this.$message(localeFilter('user_name_updated'))
        } else if (prop === 'lang') {
          await this.$store.dispatch('updateInfo', {
            locale: this.currentLanguage,
          })
          this.$message(localeFilter('language_updated'))
        }

        this.pending = false
      } catch (e) {}
    },
  },
  computed: {
    ...mapGetters({
      getUInfo: 'getUInfo',
    }),
    localeList() {
      return [
        {
          id: 'en-US',
          name: 'English',
        },
        {
          id: 'ru-RU',
          name: 'Русский',
        },
      ]
    },
    validateName() {
      return this.$v.name.$dirty && !this.$v.name.required
    },
  },
  data: () => ({
    name: '',
    select: null,
    currentLanguage: null,
    pending: false,
  }),
  metaInfo() {
    return {
      title: this.$title('profile_title'),
    }
  },
}
</script>
