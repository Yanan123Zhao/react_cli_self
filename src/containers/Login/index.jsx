import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {Button} from 'antd'
import userManager from 'utils/userManager'

class Login extends React.Component {
  render () {
    const {isLoggedIn, onLogin} = this.props
    return (
      isLoggedIn
      ? <Redirect to='/' />
      : <Button onClick={onLogin}>
        登录
      </Button>
    )
  }
}

const mapStateToProps = state => {
  const {oidcUser, user} = state
  const userId = oidcUser && oidcUser.profile && oidcUser.profile.sub
  return {
    isLoggedIn: !!userId,
    authorized: user.authorized || !user.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin () {
      userManager.signinRedirect()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)