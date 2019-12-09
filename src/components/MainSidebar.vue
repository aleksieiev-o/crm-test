<template>
  <ul class="sidenav app-sidenav" :class="{ 'open': isShowSidebar }">
    <router-link
    v-for="(item, key) of sidebarLinks"
    :key="key"
    tag="li"
    exact
    active-class="active"
    :to="item.path">
      <a class="waves-effect waves-orange pointer">
        {{ item.title }}
      </a>
    </router-link>
  </ul>
</template>

<script>
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
          path: '/',
          title: 'Счет',
        },
        {
          path: 'history',
          title: 'История',
        },
        {
          path: 'planning',
          title: 'Планирование',
        },
        {
          path: 'record',
          title: 'Новая запись',
        },
        {
          path: 'categories',
          title: 'Категории',
        },
      ]
    },
  },
}
</script>
