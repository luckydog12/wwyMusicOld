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
import TopNav from '@/components/TopNav.vue'
import Swiper from '../components/Swiper.vue'
import IconList from '../components/IconList.vue'
import FindMusicLIst from '../components/FindMusicLIst.vue'

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