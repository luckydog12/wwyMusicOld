<template>
  <ListViewTop :playlist="playlist"/>
  <MusicPlayList :playlist="playlist"/>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getMusicListItemDetail } from '@/server/musicListItemApi'
import ListViewTop from '@/components/MusicListItem/ListViewTop.vue'
import MusicPlayList from '@/components/MusicListItem/MusicPlayList.vue'
export default defineComponent({
  components: {
    ListViewTop,
    MusicPlayList
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      playlist: {
        creator: {},
        tracks: []
      },
      list: []
    })

    onMounted( async () => {
      const res = await getMusicListItemDetail({ id: route.query.id })
      state.playlist = res.data.playlist
      store.dispatch('setPlayList', state.playlist.tracks)
    })

    return {
      ...toRefs(state)
    }
  },
})
</script>

<script lang="less" scoped>

</script>