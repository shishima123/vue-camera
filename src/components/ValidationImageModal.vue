<template>
  <transition name="custom-modal">
    <div>
      <div class="custom-modal-mask">
        <div class="custom-modal-wrapper">
          <div class="custom-modal-container">

            <div class="custom-modal-header">
              <slot name="header">
                <h5 class="modal-title">BootstrapVue</h5>
              </slot>
              <button type="button" aria-label="Close" class="close">×</button>
            </div>

            <div class="custom-modal-body">
              <slot name="body">
                default body
              </slot>
            </div>

            <div class="custom-modal-footer">
              <slot name="footer">
                <div class="w-100 d-flex justify-content-evenly">
                  <button class="btn btn-secondary btn-width" @click="$emit('close')">
                    Close
                  </button>
                  <button class="btn btn-primary btn-width" @click="$emit('ok')">
                    OK
                  </button>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <loading v-if="isSendAjax"></loading>
    </div>
  </transition>
</template>

<script>
import Loading from './Loading'
export default {
  name: 'ValidationImageModal',
  components: {
    Loading
  },
  props: {
    isSendAjax: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .custom-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .custom-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .custom-modal-container {
    width: 500px;
    height: 200px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .custom-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .custom-modal-body {
    margin: 20px 0;
  }

  .custom-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
  .btn-width {
    width: 120px;
  }
  .justify-content-evenly {
    justify-content: space-evenly;
  }

  /*
 * The following styles are auto-applied to elements with
 * transition="custom-modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the custom-modal transition by editing
 * these styles.
 */

  .custom-modal-enter {
    opacity: 0;
  }

  .custom-modal-leave-active {
    opacity: 0;
  }

  .custom-modal-enter .custom-modal-container,
  .custom-modal-leave-active .custom-modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
