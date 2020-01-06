<template>
  <router-link
    tag="button"
    class="btn fixed-action-btn btn-float btn-large waves-effect waves-light"
    to="/record"
    :title="'btn_create_new_record' | locale">
    <i class="large material-icons">add</i>
  </router-link>
</template>

<script>
export default {
  name: 'MainActionButton',
}
</script>
