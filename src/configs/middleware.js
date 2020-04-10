import thunk from 'redux-thunk'
// import { logger, request, createOidcMiddleWare } from 'middlewares'
import { routerMiddleware } from 'react-router-redux'
// import { browserHistory } from 'react-router-dom'
import userManager from 'utils/userManager'
const { ENV } = globalConfig.default

const mws = [
  // createOidcMiddleWare(userManager),
  // routerMiddleware(browserHistory),
  thunk,
  // request
]

if (ENV !== 'prod') {
  // mws.push(logger)
}

export default mws
