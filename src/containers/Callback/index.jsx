/**
 * This Component is used to handle openid authentication callback
 */
import { connect } from 'react-redux'
// import userManager from 'utils/userManager'
import { push } from 'react-router-redux'
import { loadUserInfo } from 'actions'
import { rootPath } from 'configs'
// import LoadingPage from 'components/LoadingPage'

class Callback extends React.Component {
  componentDidMount () {
    // userManager.signinRedirectCallback()
    //   .then((user) => {
    //     console.log('user', user)
    //     this.onRedirectSuccess(user)
    //   },
    //   error => {
    //     console.error('redirect failed: ', error)
    //   })
    //   .catch((error) => this.onRedirectError(error))
  }

  onRedirectSuccess (user) {
    this.props.redirectTo()
    this.props.loadUserInfo()
  }

  onRedirectError (error) {
    if (this.props.errorCallback) {
      this.props.errorCallback(error)
    } else {
      console.error(`Error handling redirect callback: ${error.message}`)
    }
  }

  render () {
    // return <LoadingPage />
    return <div>callback</div>
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserInfo () {
      dispatch(loadUserInfo())
    },
    redirectTo () {
      this.history.push('/')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback)
