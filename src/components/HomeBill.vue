<template>
  <div class="col s12 m6 l4">
    <div class="card bill-card teal">
      <div class="card-content white-text">
        <span class="card-title">{{ 'bill_currency' | locale }}</span>

        <p
          v-for="(item, key) of courses"
          :key="key"
          class="currency-line">
          <span>
            {{ getCurrensy(item) | course(item) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeBill',
  props: {
    userInfo: {
      type: Object,
      default() {
        return { bill: 0 };
      },
    },
    rates: {
      type: Object,
      default: () => {},
    },
    courses: {
      type: Array,
      default() {
        return ['RUB', 'USD', 'EUR'];
      },
    },
  },
  methods: {
    getCurrensy(val) {
      return Math.floor(this.baseRates * this.rates[val]);
    },
  },
  computed: {
    ...mapGetters({
      getUInfo: 'getUInfo',
    }),
    baseRates() {
      return this.getUInfo.bill / (this.rates.RUB / this.rates.EUR);
    },
  },
};
</script>
