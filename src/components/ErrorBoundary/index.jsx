export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  componentDidCatch (error, info) {
    console.log(error, info)
    this.setState({
      hasError: true
    })
  }

  render () {
    return this.state.hasError
    ? <h1>页面出错了404</h1>
    : this.props.children
  }
}