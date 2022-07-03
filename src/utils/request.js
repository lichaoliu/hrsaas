import axios from 'axios'
import {
  Message
} from 'element-ui'
const service = axios.create({
  // 当执行npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间
})
service.interceptors.request.use()
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
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
