import ajax from '@/utils/ajax'


/*
登陆
*/
export function login({ username, password }) {
  return ajax({
    url: '/admin/acl/index/login',
    method: 'post',
    data: { username, password }
  })
}

/*
获取用户信息(根据token)
*/
export function getInfo() {
  return ajax({
    url: '/admin/acl/index/info',
    method: 'get'
  })
}

/*
登出
*/
export function logout() {
  return ajax({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}


