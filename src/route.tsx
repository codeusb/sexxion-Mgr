import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

import Layout from './pages/Layout'
import Login from './pages/Login'
// const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))
const Staff = lazy(() => import('./pages/Staff'))

import AuthRoute from './components/AuthRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true, //默认路由
        element: <Home />,
      },
      {
        path: 'article',
        element: <Article />,
      },
      {
        path: 'publish',
        element: <Publish />,
      },
      {
        path: 'staff',
        element: <Staff />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
