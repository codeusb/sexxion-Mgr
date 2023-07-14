import { FC } from 'react'
import { getToken } from '../utils'
import { Navigate } from 'react-router-dom'

//高阶组件：路由鉴权
interface IProps {
  children: React.ReactNode
}

const AuthRoute: FC<IProps> = ({ children }) => {
  const isToken = getToken()

  // console.log(isToken)

  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to="/login"></Navigate>
  }
}

export default AuthRoute
