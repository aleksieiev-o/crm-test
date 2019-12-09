<template>
  <div class="app-main-layout">
    <main-navbar @sidebarAction="isShowSidebar = !isShowSidebar"/>

    <main-sidebar :isShowSidebar="isShowSidebar"/>

    <main class="app-content" :class="{ 'full': !isShowSidebar }">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <main-action-button/>
  </div>
</template>

<script>
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
  data: () => ({
    isShowSidebar: true,
  }),
}
</script>
