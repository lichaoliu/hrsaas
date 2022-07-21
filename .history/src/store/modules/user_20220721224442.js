import {
  getToken,
  setToken,
  removeToken,
  setTimeStamp
} from '@/utils/auth'
import {
  login,
  getUserInfo,
  getUserDetailById
} from '@/api/user'

import {
  resetRouter
} from '@/router'

const state = {
  token: getToken(), // 设置token 初始化的时候，优先从缓存获取
  userInfo: {}
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
  },
  setUserInfo(state, res) {
    state.userInfo = res
  },
  removeUserInfo(state) {
    state.userInfo = {}
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
    context.commit('removeUserInfo')
    // 重置路由
    resetRouter()
    // 设置
  },
  // 设置用户信息
  async getUserInfo(context) {
    const res = await getUserInfo()
    const baseInfo = await getUserDetailById(res.userId)
    const full = {
      ...res,
      ...baseInfo
    }
    context.commit('setUserInfo', full)
    // 返回数据 给后续权限用
    return full
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
