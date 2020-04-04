import { DatePicker, Button } from 'antd';
import * as styles from './styles'

export default function () {
  return <div className={styles.wrapper}>
    <div className={styles.img}></div>
    <div>
      <DatePicker />
      <Button type='primary'>ok</Button>
    </div>
  </div>
}
