import {http} from "../../utils/http"
import { userInfoRes } from './types'

// 获取-用户个人资料(同时验证token是否过期)
export const getUserInfo = () =>
  http.get<userInfoRes, userInfoRes["data"]>("/user/profile");