<template>
  <div class="app-main-layout">
    <pre-loader v-if="!getUInfo"/>

    <template v-else>
      <main-navbar
        :userInfo="getUInfo"
        @sidebarAction="isShowSidebar = !isShowSidebar"/>

      <main-sidebar :isShowSidebar="isShowSidebar" :key="locale"/>

      <main class="app-content" :class="{ 'full': !isShowSidebar }">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <main-action-button/>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import notification from '../helpers/notificationText'
import MainNavbar from '../components/MainNavbar'
import MainSidebar from '../components/MainSidebar'
import MainActionButton from '../components/MainActionButton'

export default {
  name: 'LayoutMain',
  components: {
    MainNavbar,
    MainSidebar,
    MainActionButton,
  },
  async mounted() {
    if (!this.getUInfo) {
      await this.$store.dispatch('loadUInfo')
    }
  },
  computed: {
    ...mapGetters({
      getUInfo: 'getUInfo',
      getError: 'getError',
    }),
    locale() {
      return this.$store.getters.getUInfo.locale
    },
  },
  data: () => ({
    isShowSidebar: true,
  }),
  watch: {
    getError(fbError) {
      console.log(fbError)
      this.$error(notification[fbError.code] || 'Что-то пошло не так...')
    },
  },
}
</script>
