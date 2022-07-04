import axios from 'axios'
import router from '@/router'
import store from '@/store'
import {
  getTimeStamp
} from '@/utils/auth'

// token超时时间
const timeOut = 3600

import {
  Message
} from 'element-ui'
const service = axios.create({
  // 当执行npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isTimeOut()) {
      // 清除token
      store.dispatch('user/logout')
      // 跳转登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(response => {
  const {
    success,
    message,
    data
  } = response.data
  if (success) {
    // 如果请求成功 返回解构后的数据
    return data
  } else {
    // 失败 直接提示 不能进then 进catch
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 清除token
    store.dispatch('user/logout')
    // 跳转登录页
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

// 检查token 是否过期
function isTimeOut() {
  const now = Date.now()
  const timestamp = getTimeStamp()
  return (now - timestamp) / 1000 > timeOut
}

export default service
