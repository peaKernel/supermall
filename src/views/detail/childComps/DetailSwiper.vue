<template>
    <swiper class="detail-swiper">
      <swiper-item  v-for="item,index in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import { SwiperItem, Swiper } from '@/components/common/swiper';


export default {
  name: 'DetailSwiper',
  data() {
    return {
      
    }
  },  
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    SwiperItem,
    Swiper
  }
}
</script>

<style>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>