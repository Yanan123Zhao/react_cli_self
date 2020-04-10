import App from 'components/App'
import { hot } from 'react-hot-loader/root';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}
render(App)

export default hot(App);