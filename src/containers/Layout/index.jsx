import { Button } from 'antd'
import Main from '../Main'
import userManager from 'utils/userManager'
import { connect } from 'react-redux'
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons'

const arr = new Set([1,2,3,4])

const promise = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('hello')
  }, 1000)
})

async function hello () {
  const value = await promise
  console.log('value', value)
  return value
}

hello()

class Layout extends React.Component {
  state = {}
  handleLogin = () => {
    this.props.login()
  }

  render () {
    return <div>
      <Main />
      <HomeOutlined />
    </div>
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    login () {
      userManager.signinRedirect()
    },
    logout () {
      userManager.signoutRedirect()
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout)