<template>
  <div class="musicPlayList">
    <div class="top" :class="statusTop ? 'fix' : '' ">

      <div class="left">
        <span class="iconfont icon-bofang"></span>
        <span class="title">播放全部</span>
        <span class="num">(共{{ playlist.tracks.length }}首)</span>
      </div>

      <div class="right">
        <span class="add">+</span>
        <span class="store">
          收藏 ({{ handleCount(playlist.subscribedCount) }})
        </span>
      </div>

    </div>

    <div class="center" ref="center">

      <div class="item" v-for="(item, i) in playlist.tracks" :key="i">

        <div class="left" @click="selectMusicPlay(i)">
          <div> {{ i+1 }} </div>
          <div class="detail">
            <div class="title">{{ item.name }}</div>
            <div class="author">
              <p><span class="tag" v-for="(tagItem, idx) in item.ar" :key="idx">{{ tagItem.name }}</span></p>
              
              <span class="album">{{ item.al.name }}</span>
            </div>
          </div>
        </div>

        <div class="right">
          <span class="iconfont icon-bofangsanjiaoxing" @click="selectMusicPlay(i)"></span>
          <span class="iconfont icon-gengduo"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUpdated, ref, watch } from 'vue'
import { filterCount } from '@/utils/filterCount' 
import { throttle } from '@/utils/debounce_throttle' 
import { useStore } from 'vuex'
export default defineComponent({
  props: ["playlist"],
  setup() {
    const store = useStore()
    const handleCount = filterCount
    const center = ref(null)
    const statusTop = ref(false)
    // 点击歌名 或者 右侧播放 播放歌曲
    const selectMusicPlay = (i) => {
      store.dispatch('setPlayCurrentIndex', i)
      console.log('点击歌曲查看store',store.state.playList,store.state.playCurrentIndex)
    }
    // 头部fix固定
    const handlePlayListBaseScrollY = () => {
      let nowScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if ( nowScrollY >= 300) {
        console.log('11')
        statusTop.value = true
      } else {
        statusTop.value = false
      }
    }
    onMounted(()=> {
      window.addEventListener('scroll', throttle(handlePlayListBaseScrollY, 100))
    })
    return {
      handleCount,
      center,
      statusTop,
      handlePlayListBaseScrollY,
      selectMusicPlay
    }
  },
})
</script>

<style lang="less" scoped>
  .musicPlayList {
    width: 100%;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    .top {
      width: 100%;
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
      }
      .right {
        width: 30%;
        height: 90%;
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 0.5rem;
        color: #ccc;
        font-size: 0.2rem;
        .add {
          line-height: 1rem;
        }
      }
    }

    .center {
      padding: 0.1rem ;
      .item {
        margin: 0.2rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          width: 86%;
          .detail {
            margin-left: 0.4rem;
            .author {
              color: #ccc;
              font-size: 0.2rem;
              p {
                display: inline;
                .tag:not(:last-child)::after {
                  content: '/';
                }
                .tag:last-child::after {
                  content: '-';
                }
              }
            }
          }
        }
        .right {
          width: 14%;
        }
      }
    }
  }

  // 固定top 
  .fix {
    position: fixed;
    top: 0;
    left: 0;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    height: 1rem !important;
  }
</style>