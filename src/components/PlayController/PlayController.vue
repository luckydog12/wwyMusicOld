<template>
  <!-- 播放详情页 -->
  <PlayMusicPage 
    :nowPlayDetail="playList[playListIndex]" 
    :lyric="lyric" 
    :isPlay="isPlay"
    :audioCurrentTime="audioCurrentTime*1000"
    :duration="duration*1000"
    :handlePlay="handlePlay"
    :handleNowPlayDetail="handleNowPlayDetail"
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
    const audioCurrentTime = ref(null)
    const duration = ref(null)
    const isPlay = ref(true)
    const isShowNowPlayDetail = ref(false)
    const setId = ref(null)
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
      // duration 整首时间 currentTime 已播放时间
      duration.value = audio.value.duration
      if ( audio.value.paused ) {
        audio.value.play()
        isPlay.value = false
        setId.value =  setInterval(()=> {
          audioCurrentTime.value = audio.value.currentTime
        },200)
      } else {
        audio.value.pause()
        isPlay.value = true
        clearInterval(setId.value)  // 这里要使用.value!!!
      }
    }
    // 通过id获取歌词存入vuex
    const handleNowPlayDetail = (id) => {
      duration.value = audio.value.duration
      getNowPlayLyric({ id }).then (res => {
        if (res.data.code === 200) {
          if ( res.data.lrc ) {
            let lyrData = res.data.lrc.lyric
            let lyrVal = lyrData.split(/\n/ig)
            lyrVal.pop() // 根据/n换行符切割会导致数据最后一项为空
            let vuexLyric = lyrVal.map(( item, i, arr ) => {
              let min = item.slice(1, 3)
              let sec = item.slice(4, 6)
              let mill = item.slice(7, 10)
              let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
              let nowLyric = item.split(']')[1]
              let nextTime
              if (i+1 < arr.length) {
                let nextItem = arr[i + 1]
                let nextMin = nextItem.slice(1, 3)
                let nextSec = nextItem.slice(4, 6)
                let nextMill = nextItem.slice(7, 10)
                nextTime = parseInt(nextMin) * 60 * 1000 + parseInt(nextSec) * 1000 + parseInt(nextMill)
              }
              if (i+1 == arr.length) {
                nextTime = parseInt((duration.value * 1000).toFixed(0))
              }
              return {
                time,
                nextTime,
                nowLyric
              }
            })
            store.dispatch('setLyricDetail', vuexLyric)
          } else {
            store.dispatch('setLyricDetail', [{nowLyric: '暂无歌词'}])
          }
        } else {
          store.dispatch('setLyricDetail', [{nowLyric: '暂无歌词'}])
        }
      })
      isShowNowPlayDetail.value = true
    }
    return {
      ...toRefs(state),
      audio,
      audioCurrentTime,
      duration,
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