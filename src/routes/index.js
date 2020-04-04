import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Layout from 'containers/Layout'

export default () => (
  <BrowserRouter basename='/anaesthesia'>
    <Route path="/">
      <Layout/>
    </Route>
  </BrowserRouter>
)
