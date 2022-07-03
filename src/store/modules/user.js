import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import login from '@/api/user'

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
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    // 调用登录接口
    const {
      data: res
    } = await login(data)
    // 如果成功 设置token
    if (res.success) {
      context.commit('setToken', res.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
