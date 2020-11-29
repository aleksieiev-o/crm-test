<template>
  <div>
    <div class="page-title">
      <h3>{{ 'record_title' | locale }}</h3>
    </div>

    <pre-loader v-if="loading"/>

    <p
      v-else-if="!getCategories.length"
      class="center">
      {{ 'not_categories' | locale }}
      <router-link to="/categories">
        {{ 'create_category' | locale }}
      </router-link>
    </p>

    <form
      v-else
      class="form"
      @submit.prevent="createNotation">
      <div class="input-field">
        <select ref="select" v-model="currentCategory">
          <option value="" disabled selected>{{ 'categories_title' | locale }}</option>
          <option
            v-for="(item, key) of getCategories"
            :value="item.id"
            :key="key">{{ item.name }}
          </option>
        </select>
        <label>{{ 'category' | locale }}</label>
      </div>

      <p
        v-for="(item, key) of notationType"
        :key="key">
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            :value="item.value"
            v-model="notationCurrentValue"
          />
          <span>{{ item.name }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: validateAmount }"
        >
        <label for="amount">{{ 'amount' | locale }}</label>
        <span
          v-if="validateAmount"
          class="helper-text invalid">
          {{ 'input_amount_validate' | locale }} {{ $v.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: validateDescription }"
        >
        <label for="description">{{ 'input_description' | locale }}</label>
        <span
          v-if="validateDescription"
          class="helper-text invalid">{{ 'input_description_validate' | locale }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'btn_create' | locale }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';
import localeFilter from '../helpers/filters/localeFilter';

export default {
  name: 'AppRecord',
  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required },
  },
  async mounted() {
    await this.$store.dispatch('loadCategories');
    this.loading = false;

    /* eslint-disable no-undef */
    this.$nextTick()
      .then(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      });
    /* eslint-enable */

    if (this.getCategories.length > 0) {
      this.currentCategory = this.getCategories[0].id;
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async createNotation() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        if (this.canCreateRecord) {
          await this.$store.dispatch('createRecord', {
            type: this.notationCurrentValue,
            categoryId: this.currentCategory,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON(),
          });

          const bill = this.type === 'income'
            ? this.getUInfo.bill + this.amount
            : this.getUInfo.bill - this.amount;

          await this.$store.dispatch('updateInfo', { bill });

          this.$message(localeFilter('record_created'));
          this.resetRecordForm();
        } else {
          this.$message(`${localeFilter('not_funds_in_account')} (${this.amount - this.getUInfo.bill})`);
        }
      } catch (e) {}
    },
    resetRecordForm() {
      this.description = '';
      this.amount = 1;
      this.$v.reset();
    },
  },
  computed: {
    ...mapGetters({
      getCategories: 'getCategories',
      getUInfo: 'getUInfo',
    }),
    validateAmount() {
      return this.$v.amount.$dirty && !this.$v.amount.minValue
        && this.$v.amount.$dirty && !this.$v.amount.required;
    },
    validateDescription() {
      return this.$v.description.$dirty && !this.$v.description.required;
    },
    canCreateRecord() {
      if (this.notationCurrentValue === 'income') {
        return true;
      }
      return this.getUInfo.bill >= this.amount;
    },
  },
  data: () => ({
    loading: true,
    select: null,
    notationType: [
      {
        name: localeFilter('income'),
        value: 'income',
      },
      {
        name: localeFilter('expense'),
        value: 'outcome',
      },
    ],
    notationCurrentValue: 'income',
    currentCategory: null,
    amount: 1,
    description: '',
  }),
  metaInfo() {
    return {
      title: this.$title('record_title'),
    };
  },
};
</script>
