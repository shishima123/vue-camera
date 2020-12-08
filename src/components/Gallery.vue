<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <fullscreen class="wrapper"
                    @change="fullscreenChange"
                    :fullscreen.sync="fullscreen"
                    ref="fullscreen"
                    background="#EEE">
          <image-cropper v-model="croppa"
                         :width="screenWidth"
                         :height="screenHeight"
                         :show-remove-button="true"
                         remove-button-color="black"
                         :remove-button-size="20"
                         :show-loading="true"
                         :loading-size="50"
                         class="chart-container"
          ></image-cropper>
          <button v-if="$fullscreen.support"
                  type="button"
                  class="btn btn-default btn-map-fullscreen"
                  @click="toggleFullScreen">
            Exit
          </button>
          <img src="../assets/images/square.png" alt="square"
               style="position: absolute;top: 50%;left: 50%; transform: translate(-50%, -50%);width: 100px">
        </fullscreen>

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
      dataUrl: '',
      fullscreen: false
    }
  },
  methods: {
    uploadCroppedImage () {
      this.myCroppa.generateBlob((blob) => {
        console.log(blob)
      }, 'image/jpeg', 1)
    },
    toggleFullScreen () {
      this.$refs['fullscreen'].toggle() // recommended
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  created () {
    this.screenWidth = window.screen.width
    this.screenHeight = window.screen.height
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
  .wrapper {
    position: relative;
  }
  .wrapper .chart-container {
    height: 100%;
    width: 100%;
  }
  .wrapper .btn-map-fullscreen {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: 36px;
    line-height: 36px;
    text-align: center;
    outline: none;
  }
  .wrapper.fullscreen {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper.fullscreen .btn-map-fullscreen {
    left: 10px;
    top: 10px;
    right: auto;
    bottom: auto;
  }
</style>
