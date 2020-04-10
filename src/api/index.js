import { authApiPrefix } from 'configs'
import { checkStatus } from 'actions/action-helper'
import 'whatwg-fetch'

const { HOST, AUTH_HOST } = globalConfig.default
/** 获取登录用户信息 */
export async function loadUserInfo (token) {
  const response = await fetch(`${AUTH_HOST}${authApiPrefix}/user/?application=anaesthesia`, {
    headers: {
      authorization: `Bearer ${token}`
    }})
  return checkStatus(response)
}
