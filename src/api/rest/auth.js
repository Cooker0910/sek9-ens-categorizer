import { setLocalToken, removeLocalToken } from './localStorage'
import { jsonQuery, query } from './common'

export async function signupWithAPI(data) {
  const res = await jsonQuery('/auth/register/', 'POST', data, false)
  return res
}

export async function loginWithAPI(data) {
  const res = await jsonQuery('/auth/login/', 'POST', data, false)
  setLocalToken(JSON.stringify(res))
  return res
}

export async function logoutWithAPI() {
  console.log()
  const res = await query('/auth/logout/', { method: 'POST' })
  removeLocalToken()
  return res
}

export async function changePasswordWithAPI(data) {
  return await jsonQuery(
    '/auth/change_user_info/changePassword/',
    'POST',
    data,
    false
  )
}

export async function forgetPassword(data) {
  return await jsonQuery('/auth/forget_password/', 'POST', data, false)
}
