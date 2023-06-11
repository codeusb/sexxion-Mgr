import { createBrowserRouter } from 'react-router-dom'

import Login from './pages/Login'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Article from './pages/Article'
import Publish from './pages/Publish'
import Staff from './pages/Staff'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        index: true, //默认路由
        element: <Home />
      },
      {
        path: 'article',
        element: <Article />
      },
      {
        path: 'publish',
        element: <Publish />
      },
      {
        path: 'staff',
        element: <Staff />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
