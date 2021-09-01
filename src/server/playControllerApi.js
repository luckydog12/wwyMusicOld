import { get, post } from "./methods";

// 获取歌词
export const getNowPlayLyric = (params) => get(`/lyric?id=${params.id}`, params) 
