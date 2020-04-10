import { BrowserRouter, Route, Switch,  Redirect } from 'react-router-dom'
// import appLogger from 'utils/logger'
import { connect } from 'react-redux'
import userManager from 'utils/userManager'
import { rootPath } from 'configs'
import Layout from 'containers/Layout'
import Callback from 'containers/Callback'
import Login from '../containers/Login'
import ErrorBoundary from 'components/ErrorBoundary'

// const logger = appLogger.getLogger('Routes')

class SilentCallback extends React.Component {
  componentDidMount () {
    userManager.signinSilentCallback()
      .then(user => {
        console.log('signin silent successfully')
      }, error => {
        console.log('signin redirect failed', error)
      })
  }

  render () {
    return (
      <h1>The silent renew page, should never be shown</h1>
    )
  }
}

/*
* 用户通过第三方页面（如医院信息系统门户）进行登录时会被重定向到此处
* 此时用户在认证服务端已经处于登录状态
* 需调在客户端调用登录,使客户端也处于登录状态
*/
class SilentSignRedirect extends React.Component {
  componentDidMount () {
    userManager.removeUser()
    userManager.signinRedirect()
  }

  render () {
    return (
      <div />
    )
  }
}

class AuthorizeRoute extends React.Component {
  render () {
    const { component: Component, isLoggedIn, ...rest } = this.props
    return (
      <Route {...rest} render={props => {
        return isLoggedIn
          ? <Component {...this.props} /> 
          : <Redirect to='/login' />
      }}
      />
    )
  }
}

const mapStateToProps = state => {
  const {oidcUser} = state
  const userId = oidcUser && oidcUser.profile && oidcUser.profile.sub
  return {
    isLoggedIn: !!userId,
    authorized: state.user.authorized || !state.user.userId
  }
}

const AuthRoute = connect(mapStateToProps)(AuthorizeRoute)

function CallbackRoute (props) {
  const { component: Component, ...rest } = props
  const user = userManager.getUserSync()
  const hasLogined = user && user.profile && user.profile.sub
  return (
    <Route {...rest} render={props => {
      return hasLogined
        ? <Redirect to='/' />
        : <Component {...props} /> 
    }}
    />
  )
}

export default () => (
  <BrowserRouter basename={`${rootPath}`}>
    <ErrorBoundary>
      <Switch>
        <Route exact path='/' component={Layout} />
        <Route path='/login' component={Login} />
        <CallbackRoute path='/callback' component={Callback} />
        <Route path='/silentcallback' component={SilentCallback} />
        <Route path='/silentredirect' component={SilentSignRedirect} />
      </Switch>
    </ErrorBoundary>
  </BrowserRouter>
)
