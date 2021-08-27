<template>
  <div class="musicList">
    <div class="top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>

    <div class="center">
      <div class="swiper-container" id="musicListSwiper">
        <div class="swiper-wrapper">
          <div @click="handleRouter(item.id)" class="swiper-slide" v-for="item in musicItem" :key="item.id">
            <img :src="item.picUrl" alt="404">
            <p class="name">{{ item.name }}</p>
            <div class="count">
              <span class="iconfont icon-bofangsanjiaoxing"></span>
              <span>{{ item.playCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getMusicList } from "@/server/homeApi";
  import { filterCount } from "@/utils/filterCount"; 
  import {
    defineComponent,
    onMounted,
    onUpdated,
    reactive,
    toRefs
  } from "vue";
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
  import { useRouter } from "vue-router";

  export default defineComponent({
    name: "Home",
    components: {},
    setup() {
      const router = useRouter()
      const state = reactive({
        musicItem: []
      })
      onUpdated(() => {
        new Swiper("#musicListSwiper", {
          slidesPerView: 3,
          spaceBetween: 10,
        })
      })
      onMounted(async () => {
        let res = await getMusicList({limit: 30})
        if (res.data.code === 200) {
          state.musicItem = res.data.result
          state.musicItem.forEach(item => {
            item.playCount = filterCount(item.playCount)
          });
        }
      })
      const handleRouter = (id) => {
        router.push({ path: '/musicListItem', query: { id } })
      }
       return {
        ...toRefs(state),
        handleRouter
      }
    }
  });
</script>

<style lang="less" scoped>
  .musicList {
    width: 100%;
    padding: 0 0.4rem;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 0.4rem;
        font-weight: 900;
      }
      .more {
        border: 1px solid #ccc;
        padding: 0.1rem;
        font-size: 0.2rem;
        border-radius: 0.5rem;
      }
    }
    .center {
      margin-top: 0.3rem;
      .swiper-container {
        height: 2.8rem;
        // background: #bfa;
        .swiper-wrapper {
          .swiper-slide {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            img {
              width: 100%;
              // height: 78%;
              border-radius: 0.2rem;
            }
            .name {
              width: 100%;
              font-size: 10px;
              overflow: hidden;
            }
            .count {
              position: absolute;
              right: 2px;
              top: 0;
              color: #ccc;
              font-size: 11px;
            }
            .iconfont {
              font-size: 14px;
            }
            
          }
        }
      }
    }
  }
</style>