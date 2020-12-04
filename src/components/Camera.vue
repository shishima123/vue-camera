<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2>Current Camera</h2>
        <code v-if="device">{{ device.label }}</code>
        <div class="border" style="position: relative;">
          <vue-web-cam
            ref="webcam"
            :device-id="deviceId"
            width="100%"
            @started="onStarted"
            @stopped="onStopped"
            @error="onError"
            @cameras="onCameras"
            @camera-change="onCameraChange"
          />
          <img v-if="isCameraStart" src="../assets/images/square.png" alt="" style="position: absolute;top: 50%;left: 50%; transform: translate(-50%, -50%); width: 200px;">
        </div>

        <div class="row">
          <div class="col-md-12">
            <select v-model="camera">
              <option>-- Select Device --</option>
              <option
                v-for="device in devices"
                :key="device.deviceId"
                :value="device.deviceId"
              >{{ device.label }}</option>
            </select>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" @click="capture">Capture Photo</button>
            <button type="button" class="btn btn-danger" @click="stop">Stop Camera</button>
            <button type="button" class="btn btn-success" @click="start">Start Camera</button>
            <button type="button" class="btn btn-success" @click="toggle">Toggle Camera</button>
          </div>
        </div>
      </div>
      <div v-if="isPhotoTaken">
        <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
          Download
        </a>
      </div>
      <div class="col-md-6">
        <h2>Captured Image</h2>
        <figure class="figure">
          <img id="photoTaken" :src="img" class="img-responsive"  alt="img"/>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { WebCam } from 'vue-web-cam'
export default {
  name: 'Camera',
  components: {
    'vue-web-cam': WebCam
  },
  data () {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      isPhotoTaken: false,
      isCameraStart: false
    }
  },
  computed: {
    device: function () {
      return this.devices.find(n => n.deviceId === this.deviceId)
    }
  },
  watch: {
    camera: function (id) {
      this.deviceId = id
    },
    devices: function () {
      // Once we have a list select the first one
      const [first] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  },
  methods: {
    capture () {
      this.img = this.$refs.webcam.capture()
      this.isPhotoTaken = !this.isPhotoTaken
    },
    onStarted (stream) {
      this.isCameraStart = true
      // console.log('On Started Event', stream)
    },
    onStopped (stream) {
      this.isCameraStart = false
      // console.log('On Stopped Event', stream)
    },
    stop () {
      this.$refs.webcam.stop()
    },
    start () {
      this.$refs.webcam.start()
    },
    toggle () {
      console.log(this.deviceId)
      this.deviceId = this.devices.filter(e => this.deviceId !== e.deviceId)[0].deviceId
    },
    onError (error) {
      console.log('On Error Event', error)
    },
    onCameras (cameras) {
      this.devices = cameras
      // console.log('On Cameras Event', cameras)
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      this.isPhotoTaken = false
      // console.log('On Camera Change Event', deviceId)
    },
    downloadImage () {
      const download = document.getElementById('downloadPhoto')
      const canvas = document.getElementById('photoTaken').getAttribute('src')
        .replace('image/jpeg', 'image/octet-stream')

      download.setAttribute('href', canvas)
    }
  }
}
</script>
