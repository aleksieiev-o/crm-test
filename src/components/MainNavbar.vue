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
      :list-content="navBarDropdownList"
      @dropdownAction="dropdownAction($event)"/>
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
  methods: {
    dropdownAction(val) {
      if (val === 1) {
        this.logout()
      }
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
  },
  computed: {
    navBarDropdownList() {
      return [
        {
          value: 0,
          path: '/profile',
          title: 'Профиль',
          icon: 'account_circle',
          func: '',
        },
        {
          value: 1,
          path: '/login?message=logout',
          title: 'Выйти',
          icon: 'assignment_return',
          func: this.$emit('logout'),
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
