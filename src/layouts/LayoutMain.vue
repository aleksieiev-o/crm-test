<template>
  <div class="app-main-layout">
    <pre-loader v-if="!getUInfo"/>

    <template v-else>
      <main-navbar
        :userInfo="getUInfo"
        @sidebarAction="isShowSidebar = !isShowSidebar"/>

      <main-sidebar :isShowSidebar="isShowSidebar"/>

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
    }),
  },
  data: () => ({
    isShowSidebar: true,
  }),
}
</script>

<style lang="scss">
  .app-content {
    height: 100vh;
  }
</style>
