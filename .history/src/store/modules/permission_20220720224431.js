import {
  constantRoutes,
  asyncRoutes
} from '@/router'
const state = {
  routes: constantRoutes // 静态路由
}
const mutations = {
  setRoutes(state, newRoutes) {
    // 应该是每次更新 都应该在静态路由的基础上进行追加
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  filterRoutes(context, menus) {
		const routes = []
    menus.forEach(key => {
			routes.push(...asyncRoutes.filter(item => item.name === key))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
