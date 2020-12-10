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
      <image-guide :is-show-guild="!isImageTaken"
                   :croppa-has-image="croppaHasImage"
                   image-name="square.png">
      </image-guide>
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

    <validation-image-modal v-if="showModal"
                            @close="showModal = false"
                            @ok="validateImage"
                            :is-send-ajax="isSendAjax">
    </validation-image-modal>
  </fullscreen>
</template>

<script>
import ImageGuide from './ImageGuide'
import ValidationImageModal from './ValidationImageModal'

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
      isSendImage: false,
      showModal: false,
      isSendAjax: false
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
      this.showModal = true
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
    },
    validateImage () {
      this.isSendAjax = true
      this.$http.get('https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=0119a5072fd69f98c6b004bf6d5469fe&q=hue')
        .then(response => {
          console.log(response.body)
          setTimeout(function () {
            this.isSendAjax = false
          }.bind(this), 1000)
        }).catch(error => {
          console.log(error)
          this.isSendAjax = false
        })
    }
  },
  created () {
    this.screenWidth = window.screen.width
    this.screenHeight = window.screen.height
  },
  components: {
    ImageGuide,
    ValidationImageModal
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
