import { get, post } from "./methods";

export const getBanners = (params) => get(`/banner?type=${params.type}`, params, true)