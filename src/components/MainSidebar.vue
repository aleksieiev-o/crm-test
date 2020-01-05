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
          title: 'Счет',
        },
        {
          name: 'history',
          title: 'История',
        },
        {
          name: 'planning',
          title: 'Планирование',
        },
        {
          name: 'record',
          title: 'Новая запись',
        },
        {
          name: 'categories',
          title: 'Категории',
        },
      ]
    },
  },
}
</script>
