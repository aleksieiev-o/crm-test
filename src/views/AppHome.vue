<template>
  <div>
    <div class="page-title">
      <h3>{{ 'bill_title' | locale }}</h3>

      <button
        @click="refreshDatas"
        class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <pre-loader v-if="loading"/>

      <template v-else>
        <home-bill
          :userInfo="getUInfo"
          :rates="course.rates"
          :courses="courses"/>

        <home-course
          :rates="course.rates"
          :date="course.date"
          :courses="courses"/>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HomeBill from '../components/HomeBill';
import HomeCourse from '../components/HomeCourse';

export default {
  name: 'AppHome',
  components: {
    HomeBill,
    HomeCourse,
  },
  async mounted() {
    this.course = await this.$store.dispatch('loadCourse');
    this.loading = false;
  },
  methods: {
    async refreshDatas() {
      this.loading = true;
      this.course = await this.$store.dispatch('loadCourse');
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters({
      getUInfo: 'getUInfo',
    }),
  },
  data: () => ({
    loading: true,
    course: null,
    courses: ['RUB', 'USD', 'EUR'],
  }),
  metaInfo() {
    return {
      title: this.$title('bill_title'),
    };
  },
};
</script>
