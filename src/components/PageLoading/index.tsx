import { FC, memo } from 'react'
import styles from './index.module.less'
import { Spin } from 'antd'

const PageLoading: FC = memo(() => {
  return (
    <div className={styles.pageLoading}>
      <Spin />
    </div>
  )
})

export default PageLoading
