import baseConfig from './base'
const HOST = ''
const AUTH_HOST = ''

const userManagerConfig = {
  authority: 'http://192.168.1.180:8082/oidcserver',
  client_id: 'anaesthesiaWebApp',
  redirect_uri: 'http://localhost:8009/anaesthesia/callback',
  silent_redirect_uri: 'http://localhost:8009/anaesthesia/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile transfusionWebAPI anaesthesiaWebAPI',
  post_logout_redirect_uri: 'http://localhost:8009/anaesthesia',
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
