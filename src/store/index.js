import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    playList: [],
    playCurrentIndex: 0,
    lyricDetail: []
  },
  mutations: {
    setPlayList: (state, playList) => {
      state.playList = playList
    },
    setPlayCurrentIndex: (state, playCurrentIndex) => {
      state.playCurrentIndex = playCurrentIndex
    },
    setLyricDetail: (state, lyricDetail) => {
      state.lyricDetail = lyricDetail
    }
  },
  actions: {
    setPlayList({commit}, playList) {
      commit('setPlayList', playList)
    },
    setPlayCurrentIndex({commit}, playCurrentIndex) {
      commit('setPlayCurrentIndex', playCurrentIndex)
    },
    setLyricDetail({commit}, lyricDetail) {
      commit('setLyricDetail', lyricDetail)
    }
  },
  modules: {
  },
  // 默认存localStorage 所以每次启动项目播放的歌曲都是上次播放的最后一首 会保留
  plugins: [createPersistedState()],
})
