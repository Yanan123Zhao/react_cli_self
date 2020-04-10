import baseConfig from './base'
const HOST = ''
// todo
const AUTH_HOST = 'http://192.168.1.180:8083'

const userManagerConfig = {
  authority: 'http://192.168.1.180:8082/oidcserver',
  client_id: 'anaesthesiaWebApp',
  redirect_uri: 'http://192.168.1.72:8001/anaesthesia/callback',
  silent_redirect_uri: 'http://192.168.1.72:8001/anaesthesia/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile transfusionWebAPI anaesthesiaWebAPI',
  post_logout_redirect_uri: 'http://192.168.1.72:8001/anaesthesia',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const ENV = 'debug'

export default {
  ...baseConfig,
  AUTH_HOST,
  HOST,
  ENV,
  userManagerConfig
}
