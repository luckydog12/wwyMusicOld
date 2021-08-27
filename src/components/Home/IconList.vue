<template>
  <div class="iconList">
    <div class="iconItem">
      <span class="iconfont icon-xihuan"></span>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <span class="iconfont icon-airec"></span>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <span class="iconfont icon-gedan"></span>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <span class="iconfont icon-paihangbang"></span>
      <span>排行版</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>

<style lang="less" scoped>
  .iconList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem;
    .iconItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 0.1rem;
      .iconfont {
        width: 0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.7rem;
        color: #fff;
        background-color: red;
        border-radius: 50%;
        margin-bottom: 0.1rem;
      }
    }
  }
</style>