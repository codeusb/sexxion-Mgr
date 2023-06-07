import {http} from "../../utils/http"
import {LoginReq,LoginRes} from './types'

// 登录
export const loginIn = (params: LoginReq) =>
  http.post<LoginRes, LoginRes["data"]>("/authorizations", params);