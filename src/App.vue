<template>
  <div id="app">
    <component :is="selectedLayout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import LayoutOverlay from './layouts/LayoutOverlay'
import LayoutMain from './layouts/LayoutMain'
import PageNotFound from './layouts/PageNotFound'

export default {
  name: 'App',
  components: {
    LayoutOverlay,
    LayoutMain,
    PageNotFound,
  },
  computed: {
    selectedLayout() {
      return this.$route.path === '/' ? 'page-not-found' : `layout-${this.$route.meta.layout}` || 'layout-overlay'
    },
  },
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min";
@import "assets/style";
</style>
