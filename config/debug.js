const HOST = ''

const userManagerConfig = {
  authority: 'http://192.168.1.180:8082/oidcserver',
  client_id: 'perioprtWebApp',
  redirect_uri: 'http://localhost:8006/perioperation/callback',
  silent_redirect_uri: 'http://localhost:8006/perioperation/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile transfusionWebAPI perioprtWebAPI',
  post_logout_redirect_uri: 'http://localhost:8006/perioperation',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const ENV = 'debug'

export default {
  ENV,
  HOST,
  userManagerConfig
}