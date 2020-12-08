<template>
  <b-col cols="12">
    <div class="example-3d">
      <swiper class="swiper" :options="swiperOption" @click="clickSlideItemActive( $event)">
        <swiper-slide v-for="(image, key) in images" :key="key" :style="{ backgroundImage: 'url(' + image.imageUrl + ')' }"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div>
        <b-modal id="selectModeTypeModal"
                 title="Choose type"
                 header-class="border-bottom-0"
                 body-class="d-flex justify-content-around"
                 no-close-on-backdrop="true"
                 centered>
          <b-button variant="danger" @click="selectTypeMode('Camera')">Camera</b-button>
          <b-button variant="success"  @click="selectTypeMode('Gallery')">Gallery</b-button>
        </b-modal>
      </div>
    </div>
    <component :is="currentModeTypeComponent" @destroyComponent="destroyComponent"></component>
  </b-col>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { hasClass } from '../util/helpers'
import Camera from './Camera'
import Gallery from './Gallery'

export default {
  name: 'swiper-example-3d-coverflow',
  title: '3D Coverflow effect',
  components: {
    Swiper,
    SwiperSlide,
    Camera,
    Gallery
  },
  data () {
    return {
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: -150,
          depth: 800,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      styleImage: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#ffffff',
        backgroundPosition: 'center'
      },
      images: [
        {
          imageUrl: 'https://picsum.photos/300/300'
        },
        {
          imageUrl: 'https://picsum.photos/300/300'
        },
        {
          imageUrl: 'https://picsum.photos/300/300'
        },
        {
          imageUrl: 'https://picsum.photos/300/300'
        },
        {
          imageUrl: 'https://picsum.photos/300/300'
        },
        {
          imageUrl: 'https://picsum.photos/300/300'
        },
        {
          imageUrl: 'https://picsum.photos/300/300'
        },
        {
          imageUrl: 'https://picsum.photos/300/300'
        }
      ],
      currentModeTypeComponent: null
    }
  },
  methods: {
    clickSlideItemActive ($event) {
      if (hasClass($event.target, 'swiper-slide-active')) {
        this.$bvModal.show('selectModeTypeModal')
      }
    },
    selectTypeMode (typeModeComponent) {
      this.$bvModal.hide('selectModeTypeModal')
      this.currentModeTypeComponent = typeModeComponent
    },
    destroyComponent () {
      this.currentModeTypeComponent = null
    }
  }
}
</script>

<style>
  .example-3d {
    width: 100%;
  }
  .swiper {
    height: 100%;
    width: 100%;
  }
  .swiper .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    text-align: center;
    font-weight: bold;
    font-size: 10px;
    background-color: #2c8dfb;
    background-position: center;
    background-size: cover;
    color: #2c8dfb;
  }
  .swiper .swiper-pagination /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background-color: #2c8dfb;
  }

</style>
