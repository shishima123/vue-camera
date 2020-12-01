import Vue from 'vue'
import Router from 'vue-router'
import Camera from '@/components/Camera'
import Gallery from '@/components/Gallery'
import Slide from '@/components/Slide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Camera',
      component: Camera
    },
    {
      path: '/gallery',
      name: 'HelloWorld',
      component: Gallery
    },
    {
      path: '/slide',
      name: 'Slide',
      component: Slide
    }
  ]
})
