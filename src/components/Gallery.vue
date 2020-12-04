<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6" style="position: relative">
        <image-cropper v-model="croppa"
                       :width="screenWidth"
                       :height="screenHeight"
                       :show-remove-button="true"
                       remove-button-color="black"
                       :remove-button-size="20"
                       :show-loading="true"
                       :loading-size="50"
        ></image-cropper>
        <img src="../assets/images/square.png" alt="square" style="position: absolute;top: 50%;left: 50%; transform: translate(-50%, -50%);width: 100px">
      </div>
      <button @click="dataUrl = croppa.generateDataUrl('image/jpeg', 0.8)">Output</button>

    </div>
    <img :src="dataUrl"
         :width="screenWidth"
         :height="screenHeight">
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data () {
    return {
      screenWidth: 0,
      screenHeight: 0,
      croppa: {},
      dataUrl: ''
    }
  },
  methods: {
    uploadCroppedImage () {
      this.myCroppa.generateBlob((blob) => {
        console.log(blob)
      }, 'image/jpeg', 1)
    }

  },
  created () {
    this.screenWidth = window.screen.width / 2
    this.screenHeight = window.screen.height / 2
  }
}
</script>

<style scoped>

  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
  }
</style>
