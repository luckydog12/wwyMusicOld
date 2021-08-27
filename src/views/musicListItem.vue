<template>
  <ListViewTop :playlist="playlist"/>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getMusicListItemDetail } from '@/server/musicListItemApi'
import ListViewTop from '@/components/MusicListItem/ListViewTop.vue'
export default defineComponent({
  components: {
    ListViewTop
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      playlist: {
        creator: {}
      },
      list: []
    })
    onMounted( async () => {
      const res = await getMusicListItemDetail({ id: route.query.id })
      state.playlist = res.data.playlist
    })

    return {
      ...toRefs(state)
    }
  },
})
</script>

<script lang="less" scoped>

</script>