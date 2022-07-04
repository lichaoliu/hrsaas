import {
  getToken,
  setToken,
  removeToken,
  setTimeStamp
} from '@/utils/auth'
import {
  login
} from '@/api/user'

const state = {
  token: getToken() // 设置token 初始化的时候，优先从缓存获取
}
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    console.log('=========')
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    // 调用登录接口
    const res = await login(data)
    // 如果成功 设置token
    context.commit('setToken', res)
    // 设置token过期时间
    setTimeStamp()
  },
  logout(context) {
    context.commit('removeToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
