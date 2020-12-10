<template>
  <transition name="custom-modal">
    <div class="custom-modal-mask">
      <div class="custom-modal-wrapper">
        <div class="custom-modal-container">

          <div class="custom-modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="custom-modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="custom-modal-footer">
            <slot name="footer">
              <button class="custom-modal-default-button" @click="$emit('close')">
                Close
              </button>
              <button class="custom-modal-default-button" @click="$emit('OK')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ValidationImageModal'
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
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .custom-modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .custom-modal-body {
    margin: 20px 0;
  }

  .custom-modal-default-button {
    float: right;
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
