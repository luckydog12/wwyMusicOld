<template>
  <div class="musicList">
    <div class="top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>

    <div class="center">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            1
          </div>
          <div class="swiper-slide">
            2
          </div>
          <div class="swiper-slide">
            3
          </div>
          <div class="swiper-slide">
            4
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    defineComponent
  } from 'vue'

  export default defineComponent({
    setup() {

    },
  })
</script>

<style lang="less" scoped>
  .musicList {
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
      }
    }
  }
</style>