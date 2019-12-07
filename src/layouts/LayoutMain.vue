<template>
  <div class="app-main-layout">
    <main-navbar/>

    <main-saidbar/>

    <main class="app-content">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <main-action-button/>
  </div>
</template>

<script>
import MainNavbar from '../components/MainNavbar'
import MainSaidbar from '../components/MainSaidbar'
import MainActionButton from '../components/MainActionButton'

export default {
  name: 'LayoutMain',
  components: {
    MainNavbar,
    MainSaidbar,
    MainActionButton,
  },
}
</script>

<style lang="scss">

</style>
