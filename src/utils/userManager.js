import oidc from 'oidc-client'
const prefix = 'anaesthesia.'
const { userManagerConfig } = globalConfig.default

userManagerConfig.userStore = new oidc.WebStorageStateStore({
  store: window.localStorage,
  prefix: prefix
})

const userMgr = new oidc.UserManager(userManagerConfig)

userMgr.getUserSync = () => {
  return JSON.parse(window.localStorage.getItem(prefix + userMgr._userStoreKey))
}

export default userMgr
