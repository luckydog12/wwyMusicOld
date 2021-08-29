
// 防抖 函数只执行最后一次
export const debounce = (fn, delay) => {
  let timer = null
  return () => {
    if ( timer ) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}

// 节流 在一段时间内执行函数
export const throttle = (fn, delay) => {
  let status = true
  return () => {
    if ( !status ) {
      return false // 不执行函数
    }
    status = false
    setTimeout(() => {
      fn()
      status = true
    }, delay)
  }
}
