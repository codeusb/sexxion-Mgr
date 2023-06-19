import { getToken } from '../utils'
import { Navigate } from 'react-router-dom'

//高阶组件：路由鉴权

const AuthRoute = ({ children }: any) => {
  const isToken = getToken()
  console.log(isToken)

  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to="/login"></Navigate>
  }
}

export default AuthRoute
