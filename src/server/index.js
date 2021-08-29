import axios from 'axios'

// const baseURL = 'http://luckydog314.ltd:3000/' 
const baseURL = 'http://127.0.0.1:3000/'
axios.defaults.baseURL = baseURL
// 设置请求最大时长
axios.defaults.timeout = 10 * 1000

export default axios