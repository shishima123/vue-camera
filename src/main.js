// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Croppa from 'vue-croppa'
import fullscreen from 'vue-fullscreen'

import 'vue-croppa/dist/vue-croppa.css'

import vuetify from '@/plugins/vuetify'
import './assets/js/pleaserotate.min'
Vue.use(fullscreen) // path to vuetify export

Vue.config.productionTip = false
Vue.use(Croppa, { componentName: 'image-cropper' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})

window.addEventListener('message', (e) => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    console.log('hot reload happened')

    console.clear()
  }
})
