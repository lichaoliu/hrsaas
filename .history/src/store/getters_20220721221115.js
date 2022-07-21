const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username, // 用户名
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto, // 头像快捷访问
  companyId: state => state.user.userInfo.companyId // 头像快捷访问
  routes: state => state.permission.routes

}
export default getters
