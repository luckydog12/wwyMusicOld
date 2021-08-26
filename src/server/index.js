import axios from 'axios'

const baseURL = 'https://netease-cloud-music-api-swart-rho.vercel.app/' 
axios.defaults.baseURL = baseURL
// 设置请求最大时长
axios.defaults.timeout = 10 * 1000

export default axios