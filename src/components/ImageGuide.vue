<template>
  <img v-if="isShowGuild && croppaHasImage" :src="require(`../assets/images/${imageName}`)" :alt="imageName">
</template>

<script>
export default {
  name: 'ImageGuide',
  props: {
    isShowGuild: {
      type: Boolean,
      default: false
    },
    croppaHasImage: {
      /**
       * This prop using for gallery croppa only
       */
      type: Boolean,
      default: true
    },
    imageName: {
      type: String,
      default: require('../assets/images/square.png')
    }
  }
}
</script>

<style scoped>
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px
  }
</style>
