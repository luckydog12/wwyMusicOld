<template>
  <div class="playMusic">
    <!-- 背景图片 层级 -9999 -->
    <img :src="nowPlayDetail.al.picUrl" alt="404" class="bg">

    <div class="top flex-row-spaceBetween">
      <div class="goback iconfont icon-arrowLeft" @click="handleBack"></div>
      <div class="center">
        <!-- <marquee behavior="scroll" direction="left"> -->
          <div class="musicName">{{ nowPlayDetail.name }}</div>
          <div class="authorName">
            <span v-for="(item, i) in nowPlayDetail.ar" :key="i">
              {{ item.name }}
            </span>
          </div>
        <!-- </marquee> -->
      </div>
      <div class="share iconfont icon-fenxiang"></div>
    </div>

    <div class="content" v-if="isShowContent">
      <img class="topbar" :class="{ active : !isPlay}" src="@/assets/playMusicPage/top.png" alt="">
      <img class="disc" @click="handleIsShowContent" v-if="nowPlayDetail.al.picUrl" src="@/assets/playMusicPage/background.png" alt="">
      <img class="discCenter" @click="handleIsShowContent" v-if="nowPlayDetail.al.picUrl" :src="nowPlayDetail.al.picUrl" alt="">
      <img class="disc_default" @click="handleIsShowContent" v-else src="@/assets/playMusicPage/disc_default.png" alt="">
    </div>
    <div class="lyric" @click="handleIsShowContent" v-else>
      <p v-for="(item, i) in lyric" :key="i">{{ item.lyric }}</p>
    </div>
    <div class="process"></div>
    <div class="footer flex-row-spaceBetween">
      <span class="iconfont icon-xunhuan"></span>
      <span class="iconfont icon-shangyishoushangyige"></span>
      <span class="iconfont icon-bofang" v-if="isPlay" @click="handlePlay"></span>
      <span class="iconfont icon-iconfront-" v-else @click="handlePlay"></span>
      <span class="iconfont icon-xiayigexiayishou"></span>
      <span class="iconfont icon-liebiao1"></span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: ['nowPlayDetail', 'isPlay', 'lyric', 'handlePlay'],
  setup(prop, ctx) {
    const isShowContent = ref(false)
    const handleBack = () => {
      ctx.emit('disapper')
    }
    const handleIsShowContent = () => {
      isShowContent.value = !isShowContent.value
    }
    return {
      isShowContent,
      handleBack,
      handleIsShowContent
    }
  },
})
</script>

<style lang="less" scoped>
  .playMusic {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    .bg {
      z-index: -9999;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      filter: blur(20px);
    }
    .top {
      width: 7rem;
      height: 1.2rem;
      margin: 0.1rem auto;
      color: #fff;
     .center {
       font-size: 0.3rem;
       width: 5rem;
       .authorName {
         color: #ccc;
         font-size: 0.2rem;
       }
       .authorName span:not(:last-child)::after {
         content: '/';
       }
     }
    
     .iconfont {
       font-size: 0.5rem;
     }
    }
    .content {
      position: relative;
      border: 1px solid red;
      height: 9rem;
      .topbar {
        width: 2rem;
        margin: 0 auto;
        display: block;
        // 转动设置圆点
        transform: rotate(-30deg);
        transform-origin: 2% 2%;
        transition: all 1s;
        z-index: 10;
      }
      .active {
        transform: rotate(0);
        transform-origin: 2% 2%;
        transition: all 1s;
        z-index: 10;
      }
      .disc {
        width: 5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
      }
      .discCenter {
        width: 3rem;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
      }
      .disc_default {
        width: 5rem;
        position: absolute;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
      }
    }
    .lyric {
      height: 9rem;
      width: 100%;
      padding: 0.2rem 0.1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      overflow: scroll;
      color: #fff;
      p {
        margin: 0.1rem;
      }
    }
    .footer {
      width: 100%;
      height: 1.2rem;
      padding:0.2rem ;
      position: absolute;
      left: 0;
      bottom: 0.2rem;
      color: #fff;
      .icon-bofang, 
      .icon-iconfront- {
        font-size: 0.8rem;
      }
    }
  }
</style>