import { DatePicker, Button } from 'antd';
import {useState, useEffect, createContext, useContext, useReducer, useCallback} from 'react'
import * as styles from './styles'

export { default as test } from './test'
// if (true) {
//   import('./test')
//     .then((module) => {
//       console.log('arg', module.default)
//     })
// }

// export default function () {
//   return <div className={styles.wrapper}>
//     <div className={styles.img}></div>
//     <div>
//       <DatePicker />
//       <Button type='primary'>ok</Button>
//     </div>
//   </div>
// }

// const stateContext = createContext('default');

// export function ChildContext () {
//   const value = useContext(stateContext)
//   return (
//     <>
//         <h1>{value}</h1>
//     </>
// );
// }

// export function FatherContext() {
//   return <stateContext.Provider
//       value={"Hello React"}
//     >
//         <ChildContext/>
//     </stateContext.Provider>
// }

function init (initialCount) {
  return {count: initialCount}
}

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return init(action.payload)
    default:
      throw new Error()
  }
}
const initialState = 0
function UseReducer () {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  return <>
      Count: {state.count}
    <button onClick={() => dispatch({type: 'reset', payload: initialState})}>
      Reset
    </button>
    <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    <button onClick={() => dispatch({type: 'increment'})}>+</button>
  </>
}

function UseCallback () {
  let [count, setCount] = useState(1)
  let [num, setNum] = useState(1)

  const memoized = useCallback(() => {
    return num
  }, [count])
  // console.log("记忆：", memoized());
  // console.log("原始：", num);
  return (
    <>
      <div>{count}</div>
      <button onClick={() => {setCount(count + 1)}}> count+ </button>
      <div>{num}</div>
      <button onClick={() => {setNum(num + 1)}}> num+ </button>
    </>
  )
}

export function Count () {
  const [count, setCount] = useState(1);
    const [num, setNum] = useState(2);
    useEffect(() => {
        // console.log("count状态更新");
        return () => {
            // console.log("useEffect卸载")
        }
    },[count])
    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => {setCount(count + 1)}}>+</button>
            <h1>{num}</h1>
            <button onClick={() => {setNum(num + 1)}}>+</button>
        </>
    )
}

export default class Main extends React.Component {
  state = {
    count: 1
  }
  ele = React.createRef()
  handleClick = (e) => {
    this.setState({
      count: this.state.count + 1
    })
  }
  getSnapshotBeforeUpdate (prevProps, prevState) {
    // console.log('zzz', this.ele.current.clientHeight)
    return this.ele.current.clientHeight
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('hhhhhh', snapshot)
  }
  render () {
    const {count} = this.state
    return <div className={styles.wrapper}>
      <div ref={this.ele}className={styles.img}></div>
      <div>
        <DatePicker />
        <Button onClick={this.handleClick} type='primary'>ok</Button>
      </div>
      {/* <div>{count}</div> */}
      <Count/>
      {/* <FatherContext/> */}
      {/* < UseReducer/> */}
      <UseCallback/>
    </div>
  }
}
