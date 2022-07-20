// 权限拦截 导航守卫 路由守卫
import router from './router'
import store from './store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条
  // 有token
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 有token 跳转其他页面的时候,如果没有用户资料,获取用户资料
      if (!store.getters.userId) {
        const {
          roles
        } = await store.dispatch('user/getUserInfo')
        const routes = store.dispatch('permission/filterRoutes', roles.menus)
        console.log();
        router.addRoutes(routes) // 添加动态路由到路由表
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 没有token
    // 在白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      // 不在白名单
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
