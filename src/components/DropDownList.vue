<template>
  <ul class="right hide-on-small-and-down">
    <li>
      <a
        class="dropdown-trigger black-text"
        href="#"
        data-target="dropdown"
        ref="dropdown"
      >
        USER NAME
        <i class="material-icons right">
          {{ arrow ? 'arrow_drop_up' : 'arrow_drop_down' }}
        </i>
      </a>

      <ul id='dropdown' class='dropdown-content'>
        <template v-for="(item, key) of listContent" >
          <li
          :key="key">
            <router-link
            :to="item.path"
            class="black-text">
              <i class="material-icons">{{ item.icon }}</i>
              {{ item.title }}
            </router-link>
          </li>
        </template>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DropDownList',
  mounted() {
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      ...this.listOptions,
      onOpenStart: () => {
        this.arrow = !this.arrow
      },
      onCloseStart: () => {
        this.arrow = !this.arrow
      },
    })
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
    this.dropdown = null
  },
  props: {
    listOptions: {
      type: Object,
      default: () => {},
    },
    listContent: {
      type: Array,
      default: () => [
        {
          value: 0, path: '', title: '', icon: '',
        },
      ],
    },
  },
  data: () => ({
    arrow: false,
    dropdown: null,
  }),
}
</script>

<style lang="scss">

</style>
