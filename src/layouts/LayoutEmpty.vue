<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import notification from '../helpers/notificationText';
import localeFilter from '../helpers/filters/localeFilter';

export default {
  name: 'LayoutEmpty',
  computed: {
    ...mapGetters({
      getError: 'getError',
    }),
  },
  watch: {
    getError(fbError) {
      this.$error(localeFilter(notification[fbError.code]) || localeFilter('mess_something'));
    },
  },
};
</script>
