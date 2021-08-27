<template>
  <div class="home">
    <top-nav/>
    <Swiper />
    <IconList />
    <FindMusicLIst />
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/Home/TopNav.vue'
import Swiper from '@/components/Home/Swiper.vue'
import IconList from '@/components/Home/IconList.vue'
import FindMusicLIst from '@/components/Home/FindMusicLIst.vue'

export default {
  name: 'Home',
  components: {
    TopNav,
    Swiper,
    IconList,
    FindMusicLIst
  }
}
</script>

<style lang="less" scoped>
 
</style>