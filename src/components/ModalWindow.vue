<template>
  <div :class="classModal">
    <button
      class="btn waves-effect waves-light"
      type="button"
      @click="modal.open()">
      {{ buttonText }}

      <i
        v-if="buttonIcon"
        class="material-icons right">
        {{ buttonIcon }}
      </i>
    </button>

    <div
      :id="`${id}__${buttonText}`"
      ref="modal"
      class="modal">
      <div class="modal-footer popup-header">
        <slot name="header"/>

        <button
          class="modal-close waves-effect waves-green btn-flat">

          <i class="material-icons">close</i>
        </button>
      </div>

      <div class="modal-content">
        <slot name="content"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  mounted() {
    // eslint-disable-next-line no-undef
    this.modal = M.Modal.init(this.$refs.modal, {
      ...this.listOptions,
    });
  },
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
    this.modal = null;
  },
  props: {
    id: {
      type: String,
      default: 'modal',
    },
    classModal: {
      type: Array,
      default: () => (['']),
    },
    buttonText: {
      type: String,
      default: '',
    },
    buttonIcon: {
      type: String,
      default: '',
    },
    listOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    modal: null,
  }),
};
</script>

<style lang="scss">
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
