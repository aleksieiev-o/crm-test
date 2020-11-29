<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profile_title' | locale }}</h3>
      <h4>{{ getUInfo.bill | course }}</h4>
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

    <form class="form" @submit.prevent="editUserInfo('info')">
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

      <div class="input-field">
        <input
          id="createLimit"
          type="number"
          v-model.number="bill"
          :class="{ invalid: validateLimit }"
        >
        <label for="createLimit">{{ 'input_bill' | locale }}</label>
        <span
          v-if="validateLimit"
          class="helper-text invalid">
            {{ 'input_limit_validate' | locale }} {{ $v.bill.$params.minValue.min }}
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
import { mapGetters } from 'vuex';
import { minValue, required } from 'vuelidate/lib/validators';
import localeFilter from '../helpers/filters/localeFilter';

export default {
  name: 'AppProfile',
  validations: {
    name: { required },
    bill: { minValue: minValue(0) },
  },
  mounted() {
    /* eslint-disable no-undef */
    this.$nextTick()
      .then(() => {
        M.updateTextFields();
        this.select = M.FormSelect.init(this.$refs.profileSelect);
        M.updateTextFields();
      });
    /* eslint-enable */

    this.name = this.getUInfo.name;
    this.bill = this.getUInfo.bill;
    this.currentLanguage = this.getUInfo.locale;
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async editUserInfo(prop) {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        this.pending = true;

        if (prop === 'info') {
          if (this.name === this.getUInfo.name && this.bill === this.getUInfo.bill) {
            this.$message(localeFilter('user_info_same'));
            this.pending = false;
            return;
          }
          await this.$store.dispatch('updateInfo', {
            name: this.name,
            bill: this.bill,
            locale: this.currentLanguage,
          });
          this.$message(localeFilter('user_info_updated'));
        } else if (prop === 'lang') {
          await this.$store.dispatch('updateInfo', {
            locale: this.currentLanguage,
          });
          this.$message(localeFilter('language_updated'));
        }

        this.pending = false;
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
      ];
    },
    validateName() {
      return this.$v.name.$dirty && !this.$v.name.required;
    },
    validateLimit() {
      return this.$v.bill.$dirty && !this.$v.bill.minValue;
    },
  },
  data: () => ({
    name: '',
    bill: 0,
    select: null,
    currentLanguage: null,
    pending: false,
  }),
  metaInfo() {
    return {
      title: this.$title('profile_title'),
    };
  },
};
</script>
