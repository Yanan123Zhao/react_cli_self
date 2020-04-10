import { message } from 'antd'
import { createAction } from 'redux-actions'
import * as actionTypes from 'constants/action-types'
import * as api from 'api'

export const clearUserInfo = createAction(actionTypes.CLEAR_USER_INFO)

export const loadUserInfo = () => {
  return {
    types: [actionTypes.LOAD_USER_INFO_REQUEST, actionTypes.LOAD_USER_INFO_SUCCESS, actionTypes.LOAD_USER_INFO_ERROR],
    callAPI: async store => {
      const user = store.getState().oidcUser
      const userId = user.profile.sub
      const response = await api.loadUserInfo(user.accessToken)
      const authorized = response.data
      if (!authorized) {
        // store.dispatch(push(rootPath))
        message.error('用户权限错误')
      }
      return {
        userId,
        ...response.data,
        authorized
      }
    },
    errorHandler: error => {
      message.error('系统繁忙，无法获取用户数据')
      throw error
    }
  }
}