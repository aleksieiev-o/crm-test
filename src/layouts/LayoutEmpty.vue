<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import notification from '../helpers/notificationText'

export default {
  name: 'LayoutEmpty',
  computed: {
    ...mapGetters({
      getError: 'getError',
    }),
  },
  watch: {
    getError(fbError) {
      console.log(fbError)
      this.$error(notification[fbError.code] || 'Что-то пошло не так...')
    },
  },
}
</script>
