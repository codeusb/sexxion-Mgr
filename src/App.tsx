import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './route'
import styles from './App.module.less'

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
