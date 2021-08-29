<template>
  <div class="listViewTop">
    <div class="listViewTopNav">
      <img :src="playlist.coverImgUrl" alt="">
      <div class="back left" @click="handleBack">
        <span class="iconfont icon-arrowLeft"></span>
        <span class="title">歌单</span>
      </div>
      <div class="right">
        <span class="iconfont icon-search"></span>
        <span class="iconfont icon-gengduo"></span>
      </div> 
    </div>

    <div class="center">

      <div class="centerLeft">
        <img :src="playlist.coverImgUrl" alt="">
        <div class="count">
          <span class="iconfont icon-bofangsanjiaoxing"></span>
          <span>{{ handleCount(playlist.playCount) }}</span>
        </div>
      </div>

      <div class="centerRight">
        <div class="title">{{ playlist.name }}</div>
        <div class="author">
          <img :src="playlist.creator.avatarUrl" alt="">
          <span>{{ playlist.creator.nickname }}</span>
        </div>
        <div class="profile">
          {{ playlist.description }}
        </div>
      </div>
    </div>

    <div class="iconList">
      <div class="iconItem">
        <div class="iconfont icon-liaotian"></div>
        <div>{{ handleCount(playlist.commentCount) }}</div>
      </div>
      <div class="iconItem">
        <div class="iconfont icon-fenxiang"></div>
        <div>{{ handleCount(playlist.shareCount) }}</div>
      </div>
      <div class="iconItem">
        <div class="iconfont icon-xiazai"></div>
        <div>下载</div>
      </div>
      <div class="iconItem">
        <div class="iconfont icon-duoxuan"></div>
        <div>多选</div>
      </div>
    </div>

  </div>

</template>

<script>
import { defineComponent } from 'vue'
import { filterCount } from '@/utils/filterCount' 
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'listViewTop',
  props: ['playlist'],
  setup() {
    const router = useRouter()
    const handleCount = filterCount
    const handleBack = () => {
      router.go(-1)
    }
    return {
      handleCount,
      handleBack
    }
  },
})
</script>

<style lang="less" scoped>
  .listViewTop {
    width: 7.5rem;
    height: 6rem;
    padding: 0.2rem 0.3rem;
    .listViewTopNav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.4rem;
      color: #fff;
      img {
        position: fixed;
        left: 0;
        top: 0;
        z-index: -99999;
        width: 100%;
        filter: blur(35px);
      }
      .left,
      .right {
        display: flex;
        align-items: center;
      }
      .left {
        .title {
          margin-left: 0.1rem;
        } 
      }
      .right {
        .icon-search {
          margin-right: 0.1rem;
        }
      }
    }
    .center {
      width: 100%;
      height: 2.8rem;
      margin: 0.6rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .centerLeft {
        width: 40%;
        position: relative;
        img {
          width: 100%;
          border-radius: 0.2rem;
        }
        .count {
          position: absolute;
          right: 0.1rem;
          top: 0;
          color: #fff;
          font-size: 14px;
          .iconfont {
            font-size: 16px;
          }
        }
      }
      .centerRight {
        width: 50%;
        height: 95%;
        color: #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          color: #fff;
        }
        .author {
          display: flex;
          align-items: center;
          img {
            width: 0.6rem;
            border-radius: 0.3rem;
          }
          span {
            margin-left: 0.1rem;
            font-size: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }
        // css技巧
        .profile {
          font-size: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .iconList {
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ccc;
      .iconItem {
        text-align: center;
        .iconfont {
          color: #fff;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
</style>