import Routes from 'routes'
import { Provider } from 'react-redux'
// import userManager from 'utils/userManager'
import store from 'store'
// import { OidcProvider } from 'redux-oidc'
import { loadUserInfo } from 'actions'
import { rootPath } from 'configs'

export default class App extends React.Component {
  componentWillMount () {
    if (window.location.pathname === `${rootPath}/silentredirect`) {
      return
    }
    // init user info
    // userManager.getUser()
    //   .then(user => {
    //     if (user && !user.expired && store.getState().user.userId === '') {
    //       store.dispatch(loadUserInfo())
    //     }
    //   })
  }

  render () {
    return (
      <Provider {...{ store }}>
        {/* <OidcProvider store={store} userManager={userManager}> */}
          <Routes />
        {/* </OidcProvider> */}
      </Provider>
    )
  }
}
