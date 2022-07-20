import {
  constantRoutes
} from '@/router'
const state = {
  routes: constantRoutes // 静态路由
}
const mutations = {
  setRoutes(state, newRoutes) {

  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
