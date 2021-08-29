<template>
  <div class="playController">
    <div class="left">
      <img :src="playList[playListIndex].al.picUrl" alt="404">
      <div class="content">
        <p class="musicName">{{ playList[playListIndex].name}}</p>
        <p class="tip">横滑可以切换上下首哦</p>
      </div>
    </div>
    <div class="right">
      <span class="play iconfont icon-bofang" @click="handlePlay" v-if="isPlay"></span>
      <span class="pause iconfont icon-iconfront-" @click="handlePlay" v-else></span>
      <span class="list iconfont icon-liebiao1"></span>
    </div>
    <audio ref="audio" :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, ref, onUpdated, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const audio = ref(null)
    const isPlay = ref(true)
    const state = reactive({
      playList: [{al:{}}],
      playListIndex: 0
    })
    onMounted(()=> {
      state.playList = computed(()=>store.state.playList)
      state.playListIndex = computed(()=>store.state.playCurrentIndex)
    })
    
    const handlePlay = () => {
      audio.value.paused ? 
        (audio.value.play(), isPlay.value = false) : 
        (audio.value.pause(), isPlay.value = true)
      console.log(audio.value.paused)
    }
    return {
      ...toRefs(state),
      audio,
      handlePlay,
      isPlay
    }
  },
})
</script>

<style lang="less" scoped>
  .playController {
    width: 7.5rem;
    height: 1.2rem;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    background-color: #fff;
    padding: 0.1rem 0.2rem;
    .left {
      display: flex;
      img {
        width: 0.8rem;
        border-radius: 50%;
      }
      .content {
        margin-left: 0.1rem;
        .tip {
          font-size: 0.1rem;
          color: #ccc;
        }
      }
    }
    .right {
      .iconfont {
        font-size: 0.6rem;
      }
      .play, .pause {
          margin-right: 0.1rem;
        }
    }
  }
</style>