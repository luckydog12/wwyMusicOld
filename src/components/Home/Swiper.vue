<template>
  <div class="swiper-container swiper3">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in lists" :key="item.pic">
        <img :src="item.pic" alt="" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import {
    defineComponent,
    onMounted,
    onUpdated,
    reactive,
    ref,
    toRefs
  } from "vue";
  import {
    getBanners
  } from '@/server/homeApi'
  import Swiper, {
    Autoplay,
    EffectCoverflow,
    EffectCube,
    Pagination,
    Navigation,
  } from "swiper";
  Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

  // swiper-bundle.min.css 决定了小圆点和左右翻页标签，如果不需要可以不引用
  import "swiper/swiper-bundle.min.css";

  // swiper.less/sass/css 决定了基础的样式
  import "swiper/swiper.less";

  export default defineComponent({
    name: "Home",
    components: {},
    setup() {
      let imgs = reactive({
        lists: []
      })
      onMounted(async () => {
        let res = await getBanners({ type: 2 })
        if ( res.data.code === 200 ) {
          imgs.lists = res.data.banners
        }

      });
      onUpdated(() => {
        new Swiper(".swiper3", {
          pagination: {
            el: ".swiper-pagination",
          },
          loop: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          effect: "cube",
          cubeEffect: {
            slideShadows: true,
            shadow: true,
            shadowOffset: 100,
            shadowScale: 0.6,
          },
        });
      })
      return {
        ...toRefs(imgs)
      }
    },
  });
</script>

<style lang="less" scoped>
  .swiper-container {
    width: 95%;
    height: 2.5rem;
    border-radius: 0.2rem;
    margin: 0 auto;

    .swiper-slide {
      img {
        width: 100%;
      }
    }
  }
</style>