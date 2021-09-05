<template>
    <div class="topNav">
      <div class="topLeft">
        <span class="iconfont icon-liebiao"></span>
      </div>
      <div class="topCenter">
        <span class="navBtn">我的</span>
        <span class="navBtn active">发现</span>
        <span class="navBtn">云村</span>
        <span class="navBtn">视频</span>
      </div>
      <div class="topRight" @click="handleSearch">
        <span class="iconfont icon-search"></span>
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const handleSearch = () => {
      router.push('/search')
    }
    return {
      handleSearch
    }
  },
})
</script>


<style lang="less" scoped>
 .topNav {
   width: 7.5rem;
   height: 1rem;
   padding: 0 0.2rem;
   display: flex;
   align-items: center;
   justify-content: space-between;
   .topCenter {
    width: 4.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .active {
      font-weight: 900;
    }
   }
 }
</style>