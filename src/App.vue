<template>
  <div id="app">
    <component :is="selectedLayout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import LayoutEmpty from './layouts/LayoutEmpty';
import LayoutMain from './layouts/LayoutMain';

export default {
  name: 'App',
  components: {
    LayoutEmpty,
    LayoutMain,
  },
  computed: {
    selectedLayout() {
      return this.$route.meta.layout ? `layout-${this.$route.meta.layout}` : 'layout-empty';
    },
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min";

  #toast-container {
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    top: auto;
    right: auto;
  }

  .empty-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5rem;
    height: 100vh;
  }

  .auth-card {
    width: 500px;
  }

  .auth-submit {
    width: 100%;
  }

  .helper-text.invalid {
    color: #f44336;
  }

  .app-page {
    padding: 2rem;
  }

  .app-main-layout {
    position: relative;
    min-height: 100vh;
  }

  .app-sidenav {
    padding-top: 5px;
    position: absolute;
    top: 64px;
    width: 250px;
    transition: transform .3s;
    bottom: 0 !important;
    height: auto !important;
  }

  .app-sidenav.open {
    transform: translateX(0);
  }

  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px !important;
    padding: 0 2rem;
    z-index: 1000;
  }

  .nav-wrapper {
    justify-content: space-between
  }

  .nav-wrapper, .navbar-left {
    display: flex;
    align-items: center;
  }

  .navbar-left > a {
    margin-right: 1rem;
  }

  .app-content {
    padding-top: 64px;
    padding-left: 250px;
    transition: padding-left .3s;
    position: relative;
    height: 100vh;
  }

  .app-content.full {
    padding-left: 0;
  }

  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: solid 1px rgba(51, 51, 51, .12);
  }

  .page-title a {
    color: #000;
    opacity: .8;
  }

  .page-subtitle h4, .page-title h3, .page-title h4 {
    margin: 0;
    font-size: 2rem;
  }

  .page-subtitle h4, .page-title {
    margin-bottom: 2rem;
  }

  .currency-line {
    align-items: center;
    border-bottom: 2px solid #fff;
    padding-bottom: 1rem;
    padding-top: 1.5rem;
  }

  .currency-line span {
    font-size: 1.5rem;
  }

  .bill-card {
    height: 310px;
  }

  .pointer {
    cursor: pointer;
  }

  .form {
    max-width: 500px
  }

  .breadcrumb-wrap, .breadcrumb-wrap a, .breadcrumb-wrap a:before {
    align-items: center;
  }

  .breadcrumb-wrap {
    position: relative;
    display: flex;
  }

  .breadcrumb-wrap a, .breadcrumb-wrap a:before {
    display: inline-flex;
    color: rgba(0, 0, 0, .7) !important;
  }

  .history-chart {
    max-width: 600px;
    margin: 0 auto;
  }

  .progress {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .btn-float {
    width: 56px;
    height: 56px;
    padding: 0 !important;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 0;
  }

  .fixed-action-btn {
    position: fixed;
    right: 23px;
    bottom: 23px;
    padding-top: 15px;
    margin-bottom: 0;
    z-index: 997;
  }

  .pagination li.active {
    background-color: teal;
  }
</style>
