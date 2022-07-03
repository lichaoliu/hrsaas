import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

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
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
