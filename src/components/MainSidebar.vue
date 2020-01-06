<template>
  <ul class="sidenav app-sidenav" :class="{ 'open': isShowSidebar }">
    <router-link
    v-for="(item, key) of sidebarLinks"
    :key="key"
    tag="li"
    exact
    active-class="active"
    :to="item.name">
      <a class="waves-effect waves-amber darken-3 pointer">
        {{ item.title }}
      </a>
    </router-link>
  </ul>
</template>

<script>
import localeFilter from '../helpers/filters/localeFilter'

export default {
  name: 'MainSidebar',
  props: {
    isShowSidebar: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    sidebarLinks() {
      return [
        {
          name: '/',
          title: localeFilter('sidebar_bill'),
        },
        {
          name: 'history',
          title: localeFilter('sidebar_history'),
        },
        {
          name: 'planning',
          title: localeFilter('sidebar_planning'),
        },
        {
          name: 'record',
          title: localeFilter('sidebar_record'),
        },
        {
          name: 'categories',
          title: localeFilter('sidebar_categories'),
        },
      ]
    },
  },
}
</script>
