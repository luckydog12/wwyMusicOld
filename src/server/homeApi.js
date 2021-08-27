import { get, post } from "./methods";

// 获取轮播图
export const getBanners = (params) => get(`/banner?type=${params.type}`, params)

// 获取推荐歌单
export const getMusicList = (params) => get(`/personalized?limit=${params.limit}`, params) 