import { get, post } from "./methods";

// 获取推荐歌单详细信息
export const getMusicListItemDetail = (params) => get(`/playlist/detail?id=${params.id}`, params) 
