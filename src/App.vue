<template>
  <div id="app">
    <component :is="selectedLayout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import LayoutEmpty from './layouts/LayoutEmpty'
import LayoutMain from './layouts/LayoutMain'

export default {
  name: 'App',
  components: {
    LayoutEmpty,
    LayoutMain,
  },
  computed: {
    selectedLayout() {
      return `layout-${this.$route.meta.layout}` || 'layout-empty'
    },
  },
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min";
@import "assets/style";
</style>
