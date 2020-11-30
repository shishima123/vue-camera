<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2>Current Camera</h2>
        <code v-if="device">{{ device.label }}</code>
        <div class="border">
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
            <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>
            <button type="button" class="btn btn-danger" @click="onStop">Stop Camera</button>
            <button type="button" class="btn btn-success" @click="onStart">Start Camera</button>
          </div>
        </div>
      </div>
      <div v-if="isPhotoTaken">
        <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
          Download
        </a>
        <p id="debug">0</p>
      </div>
      <div class="col-md-6">
        <h2>Captured Image</h2>
        <figure class="figure">
          <img :src="img" class="img-responsive" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { WebCam } from 'vue-web-cam'
export default {
  name: 'Hello',
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
      count: 0
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
      const [first, ...tail] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  },
  methods: {
    onCapture () {
      this.img = this.$refs.webcam.capture()
      this.isPhotoTaken = !this.isPhotoTaken
    },
    onStarted (stream) {
      alert('On Started Event:' + stream)
    },
    onStopped (stream) {
      alert('On Stopped Event: ' + stream)
    },
    onStop () {
      this.$refs.webcam.stop()
    },
    onStart () {
      this.$refs.webcam.start()
    },
    onError (error) {
      alert('On Error Event: ' + error)
    },
    onCameras (cameras) {
      this.devices = cameras
      alert('On Cameras Event: ' + cameras)
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      this.isPhotoTaken = false
      alert('On Camera Change Event: ' + deviceId)
    },
    downloadImage () {
      document.getElementById('debug').innerText(this.count++)
      const download = document.getElementById('downloadPhoto')
      const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg')
        .replace('image/jpeg', 'image/octet-stream')

      download.setAttribute('href', canvas)
    }
  }
}
</script>
