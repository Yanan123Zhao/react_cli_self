import Main from '../Main'

const arr = new Set([1,2,3,4])

const promise = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('hello')
  }, 1000)
})

export default class Layout extends React.Component {
  render () {
    console.log('arr', arr)
    return <div>
      <div>0000000000000000</div>
      <Main/>
    </div>
  }
}