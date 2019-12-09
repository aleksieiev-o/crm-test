<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('sidebarAction')">
          <i class="material-icons black-text">menu</i>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <drop-down-list
      :list-options="{ coverTrigger: false, alignment: 'right' }"
      :list-content="navBarDropdownList"/>
    </div>
  </nav>
</template>

<script>
import DropDownList from './DropDownList'

export default {
  name: 'MainNavbar',
  components: {
    DropDownList,
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  computed: {
    navBarDropdownList() {
      return [
        {
          value: 0,
          path: '/profile',
          title: 'Профиль',
          icon: 'account_circle',
        },
        {
          value: 1,
          path: '/login?message=logout',
          title: 'Выйти',
          icon: 'assignment_return',
        },
      ]
    },
  },
  data: () => ({
    date: new Date(),
    interval: null,
  }),
}
</script>
