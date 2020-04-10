import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import { oidcReducer as oidcUser } from 'redux-oidc'
import user from './user'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  // oidcUser
})

export default rootReducer
