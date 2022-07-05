import request from '@/utils/request'

/**
 *登录接口封装
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/**
 * 获取用户头像信息
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
