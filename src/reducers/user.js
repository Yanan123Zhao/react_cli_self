import { combineReducers } from 'redux'
import * as types from 'constants/action-types'

const avatarUrl = (state = '', action) => {
  switch (action.type) {
    case types.LOAD_USER_INFO_SUCCESS :
      return action.payload.avatarUrl || ''
    case types.CLEAR_USER_INFO:
      return ''
    default:
      return state
  }
}

const realName = (state = '', action) => {
  switch (action.type) {
    case types.LOAD_USER_INFO_SUCCESS :
      return action.payload.realName || ''
    case types.CLEAR_USER_INFO:
      return ''
    default:
      return state
  }
}

const userId = (state = '', action) => {
  switch (action.type) {
    case types.LOAD_USER_INFO_SUCCESS :
      return action.payload.userId || ''
    case types.CLEAR_USER_INFO:
      return ''
    default:
      return state
  }
}

const authorized = (state = false, action) => {
  switch (action.type) {
    case types.LOAD_USER_INFO_SUCCESS :
      return !!action.payload.authorized
    case types.CLEAR_USER_INFO:
      return false
    default:
      return state
  }
}

const groups = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_USER_INFO_SUCCESS:
      return action.payload.groups
    case types.CLEAR_USER_INFO:
      return []
    default:
      return state
  }
}

export default combineReducers({
  avatarUrl,
  realName,
  userId,
  authorized,
  groups
})
