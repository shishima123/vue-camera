<template>
    <fullscreen class="wrapper"
                @change="fullscreenChange"
                :fullscreen.sync="fullscreen"
                ref="fullscreen"
                background="#EEE">
      <div class="wrapper-container">
        <vue-web-cam v-if="!isPhotoTaken"
          ref="webcam"
          :device-id="deviceId"
          :autoplay="autoPlay"
          @error="onError"
          @cameras="onCameras"
          @camera-change="onCameraChange"
          :resolution="resolution"
        />
        <figure v-if="isPhotoTaken">
          <img :width="width" :height="height" id="photoTaken" :src="img" class="img-responsive"  alt="img"/>
        </figure>
        <image-guide :is-show-guild="isCameraStart" image-name="square.png"></image-guide>
      </div>
      <button v-if="$fullscreen.support" type="button" class="btn btn-default btn-map-fullscreen btn-exit-fullscreen" @click="toggleFullScreen">
        Exit
      </button>
      <button type="button" class="btn btn-success btn-map-fullscreen btn-toggle-camera" @click="toggleCamera">Toggle Camera</button>
      <button type="button" class="btn btn-primary btn-map-fullscreen btn-capture-camera" @click="capture">Capture Photo</button>
    </fullscreen>
</template>

<script>
import { WebCam } from 'vue-web-cam'
import ImageGuide from './ImageGuide'
export default {
  name: 'Camera',
  components: {
    'vue-web-cam': WebCam,
    ImageGuide
  },
  data () {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      isPhotoTaken: false,
      isCameraStart: false,
      fullscreen: false,
      autoPlay: true,
      width: null,
      height: null,
      resolution: {
        width: 0,
        height: 0
      }
    }
  },
  watch: {
    camera: function (id) {
      this.deviceId = id
    },
    devices: function () {
      // Once we have a list select the first one
      const last = this.devices[this.devices.length - 1]
      if (last) {
        this.camera = last.deviceId
        this.deviceId = last.deviceId
      }
    }
  },
  methods: {
    capture () {
      this.img = this.$refs.webcam.capture()
      this.isPhotoTaken = !this.isPhotoTaken
      this.isCameraStart = false
    },
    // stop () {
    //   this.isCameraStart = false
    //   this.$refs.webcam.stop()
    // },
    // start () {
    //   this.autoPlay = true
    //   this.isCameraStart = true
    //   this.$refs.webcam.start()
    // },
    toggleCamera () {
      this.isPhotoTaken = false
      this.deviceId = this.devices.filter(e => this.deviceId !== e.deviceId)[0].deviceId
    },
    onError (error) {
      console.log('On Error Event', error)
    },
    onCameras (cameras) {
      this.isCameraStart = true
      this.devices = cameras
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      this.isPhotoTaken = false
    },

    toggleFullScreen () {
      this.$refs.webcam.stop()
      this.$refs['fullscreen'].toggle() // recommended
      this.$emit('destroyComponent')
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  created () {
    let ratio = window.devicePixelRatio || 1
    let widthScreen = screen.width * ratio
    let heightScreen = screen.height * ratio
    if (widthScreen > heightScreen) {
      this.resolution.width = widthScreen
      this.resolution.height = heightScreen
      this.width = screen.width
      this.height = screen.height
    } else {
      this.resolution.width = heightScreen
      this.resolution.height = widthScreen
      this.width = screen.height
      this.height = screen.width
    }
    console.log(this.resolution)
  },
  mounted () {
    this.fullscreen = true
  }
}
</script>

<style scoped>
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
  .wrapper.fullscreen .btn-map-fullscreen.btn-toggle-camera {
    right: 10px;
    top: 10px;
  }
  .wrapper.fullscreen .btn-map-fullscreen.btn-capture-camera {
    right: 10px;
    top: 50%;
  }
</style>
