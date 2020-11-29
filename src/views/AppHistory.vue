<template>
  <div>
    <div class="page-title">
      <h3>{{ 'history_title' | locale }}</h3>
    </div>

    <pre-loader v-if="loading"/>

    <p
      v-else-if="!getRecords.length"
      class="center">
      {{ 'not_records' | locale }}
      <router-link to="/record">
        {{ 'create_record' | locale }}
      </router-link>
    </p>

    <section v-else>
      <modal-window
        :class-modal="['center']"
        :id="'modal1'"
        :button-text="'btn_more_details' | locale">

        <template v-slot:header>
          <h5 style="margin: 0">
            {{ 'record_popup_title' | locale }}
          </h5>
        </template>

        <template v-slot:content>
          <div class="history-chart">
            <canvas ref="canvas"/>
          </div>
        </template>
      </modal-window>

      <history-table
      :list="currentPages"/>

      <paginate-mixin
        v-if="pageCount > 1"
        class="center"
        v-model="page"
        :page-count="pageCount"
        :click-handler="paginateHandler"
        :prev-text="'prev_page' | locale"
        :next-text="'next_page' | locale"
        :container-class="'pagination'"
        :page-class="'waves-effect'"/>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Pie } from 'vue-chartjs';
import paginationMixin from '../helpers/mixins/paginationMixin';
import HistoryTable from '../components/HistoryTable';
import ModalWindow from '../components/ModalWindow';
import localeFilter from '../helpers/filters/localeFilter';

export default {
  name: 'AppHistory',
  components: {
    HistoryTable,
    ModalWindow,
  },
  async mounted() {
    await this.$store.dispatch('loadCategories');
    await this.$store.dispatch('loadRecords');

    this.createPagination(this.modifiedRecords);

    this.$nextTick()
      .then(() => {
        if (this.getRecords.length > 0) {
          this.createChart();
        }
      });

    this.loading = false;
  },
  methods: {
    createRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    },
    createChart() {
      this.renderChart({
        labels: this.getCategories.map((item) => item.name),
        datasets: [{
          label: localeFilter('costs_by_category'),
          data: this.getCategories.map((item) => this.getRecords.reduce((total, val) => {
            if (val.categoryId === item.id && val.type === 'outcome') {
              // eslint-disable-next-line no-param-reassign
              total += +val.amount;
            }
            return total;
          }, 0)),
          backgroundColor: this.pieDiagramColors,
        }],
      });
    },
  },
  computed: {
    ...mapGetters({
      getCategories: 'getCategories',
      getRecords: 'getRecords',
    }),
    modifiedRecords() {
      if (this.getRecords && this.getCategories) {
        return this.getRecords.map((item) => ({
          ...item,
          categoryName: this.getCategories.find((cat) => cat.id === item.categoryId).name,
          typeClass: item.type === 'income' ? 'teal' : 'red',
          typeText: item.type === 'income' ? localeFilter('income') : localeFilter('expense'),
        }));
      }
      return null;
    },
    pieDiagramColors() {
      const arr = [];
      for (let i = 0; i < this.getCategories.length; i += 1) {
        arr.push(this.createRandomColor());
      }
      return arr;
    },
  },
  data: () => ({
    loading: true,
    isOpenModal: false,
  }),
  metaInfo() {
    return {
      title: this.$title('history_title'),
    };
  },
  mixins: [
    paginationMixin,
  ],
  extends: Pie,
};
</script>
