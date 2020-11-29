import _ from 'lodash';

export default {
  methods: {
    createPagination(pages) {
      this.allPages = _.chunk(pages, this.pageSize);
      this.pageCount = _.size(this.allPages);
      this.currentPages = this.allPages[this.page - 1] || this.allPages[0];
    },
    paginateHandler(page) {
      this.$router.push(`${this.$route.path}?page=${this.page}`);
      this.currentPages = this.allPages[page - 1] || this.allPages[0];
    },
  },
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 4,
      pageCount: 0,
      allPages: [],
      currentPages: [],
    };
  },
};
