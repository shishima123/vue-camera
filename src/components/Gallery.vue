<template>
  <fullscreen class="wrapper"
              @change="fullscreenChange"
              :fullscreen.sync="fullscreen"
              ref="fullscreen"
              background="#EEE">
    <div class="wrapper-container">
      <image-cropper  v-if="!isImageTaken" v-model="croppa"
                     :width="screenWidth"
                     :height="screenHeight"
                     :show-remove-button="true"
                     remove-button-color="black"
                     :remove-button-size="20"
                     :show-loading="true"
                     :loading-size="50"
                      @init="handleCroppaInit"
                      @file-choose="handleCroppaFileChoose"
      ></image-cropper>
      <image-guide :is-show-guild="!isImageTaken" :croppa-has-image="croppaHasImage" image-name="square.png"></image-guide>
    </div>
    <button v-if="$fullscreen.support"
            type="button"
            class="btn btn-default btn-map-fullscreen btn-exit-fullscreen"
            @click="toggleFullScreen">
      Exit
    </button>
    <button v-if="$fullscreen.support && !isImageTaken && croppaHasImage"
            class="btn btn-default btn-map-fullscreen btn-crop-image"
            @click="cropImage">Output
    </button>
    <img v-if="isImageTaken" :src="dataUrl"
         :width="screenWidth"
         :height="screenHeight">
    <div style="position: absolute;top:50%; left:50%; transform: translate(-50%, -50%)" v-if="isSendImage">
        <button>
          abc
        </button>
    </div>
  </fullscreen>
</template>

<script>
import ImageGuide from './ImageGuide'
export default {
  name: 'Gallery',
  data () {
    return {
      screenWidth: 500,
      screenHeight: 500,
      croppa: {},
      dataUrl: '',
      fullscreen: false,
      isImageTaken: false,
      isSendImage: false
    }
  },
  computed: {
    croppaHasImage () {
      return this.croppa.imageSet
    }
  },
  methods: {
    cropImage () {
      this.dataUrl = this.croppa.generateDataUrl('image/jpeg', 1)
      this.isImageTaken = true
      this.isSendImage = true
    },
    uploadCroppedImage () {
      this.croppa.generateBlob((blob) => {
        console.log(blob)
      }, 'image/jpeg', 1)
    },
    toggleFullScreen () {
      this.$refs['fullscreen'].toggle() // recommended
      this.$emit('destroyComponent')
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    handleCroppaInit () {
      this.croppa.chooseFile()
    },
    handleCroppaFileChoose () {
      this.fullscreen = true
    }
  },
  created () {
    this.screenWidth = window.screen.width
    this.screenHeight = window.screen.height
  },
  components: {
    ImageGuide
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
  .wrapper .wrapper-container {
    height: 100%;
    width: 100%;
  }
  .wrapper .btn-map-fullscreen {
    position: absolute;

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
  .wrapper.fullscreen .btn-map-fullscreen.btn-exit-fullscreen {
    left: 10px;
    top: 10px;
  }
  .wrapper.fullscreen .btn-map-fullscreen.btn-crop-image {
    right: 10px;
    top: 10px;
  }
  .wrapper.fullscreen .btn-map-fullscreen.btn-capture-camera {
    right: 10px;
    top: 50%;
  }
</style>
