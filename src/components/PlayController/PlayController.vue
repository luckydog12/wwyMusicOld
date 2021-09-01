<template>
  <!-- 播放详情页 -->
  <PlayMusicPage 
    :nowPlayDetail="playList[playListIndex]" 
    :lyric="lyric" 
    :isPlay="isPlay"
    :handlePlay="handlePlay"
    v-show="isShowNowPlayDetail"
    @disapper="isShowNowPlayDetail=!isShowNowPlayDetail"
  />
  <!-- 底部播放组件 -->
  <div class="playController" v-show="!isShowNowPlayDetail">
    <div class="left" @click="handleNowPlayDetail(playList[playListIndex].id)">
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
import PlayMusicPage from './PlayMusicPage.vue'
import { getNowPlayLyric } from '@/server/playControllerApi.js'

export default defineComponent({
  components: {
    PlayMusicPage
  },
  setup() {
    const store = useStore()
    const audio = ref(null)
    const isPlay = ref(true)
    const isShowNowPlayDetail = ref(false)
    const state = reactive({
      playList: [{al:{},ar: []}],
      playListIndex: 0,
      lyric: []
    })
    onMounted(()=> {
      state.playList = computed(()=>store.state.playList)
      state.playListIndex = computed(()=>store.state.playCurrentIndex)
      state.lyric = computed(()=>store.state.lyricDetail)
    })
    // 播放/暂停
    const handlePlay = () => {
      audio.value.paused ? 
        (audio.value.play(), isPlay.value = false) : 
        (audio.value.pause(), isPlay.value = true)
    }
    // 通过id获取歌词存入vuex
    const handleNowPlayDetail = (id) => {
      getNowPlayLyric({ id }).then (res => {
        if (res.data.code === 200) {
          if (res.data.lrc.lyric) {
            let lyrVal = res.data.lrc.lyric
            let vuexLyric = lyrVal.split(/\n/ig).map(item => {
              let min = item.slice(1, 3)
              let sec = item.slice(4, 6)
              let mill = item.slice(7, 10)
              let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
              let lyric = item.split(']')[1]
              return {
                time,
                lyric
              }
            })
            store.dispatch('setLyricDetail', vuexLyric)
          } else {
            lyric.value = '暂无歌词'
          }
        } else {
          lyric.value = '暂无歌词'
        }
      })
      isShowNowPlayDetail.value = true
    }
    return {
      ...toRefs(state),
      audio,
      isPlay,
      isShowNowPlayDetail,
      handlePlay,
      handleNowPlayDetail
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