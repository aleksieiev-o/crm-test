<template>
  <ul class="sidenav app-sidenav" :class="{ 'open': isShowSidebar }">
    <router-link
    v-for="(item, key) of sidebarLinks"
    :key="key"
    tag="li"
    exact
    active-class="active"
    :to="{ name: item.name }">
      <a class="waves-effect waves-amber darken-3 pointer">
        {{ item.title }}
      </a>
    </router-link>
  </ul>
</template>

<script>
import localeFilter from '../helpers/filters/localeFilter';

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
          name: 'home',
          title: localeFilter('bill_title'),
        },
        {
          name: 'history',
          title: localeFilter('history_title'),
        },
        {
          name: 'planning',
          title: localeFilter('planning_title'),
        },
        {
          name: 'record',
          title: localeFilter('record_title'),
        },
        {
          name: 'categories',
          title: localeFilter('categories_title'),
        },
      ];
    },
  },
};
</script>
