import {http} from "../../utils/http"
import { userInfoRes } from './types'

// 获取-用户个人资料(同时验证token是否过期)
export const getUserInfo = () =>
  http.get<userInfoRes, userInfoRes["data"]>("/user/profile");

// 获取-用户详细资料

// 获取-用户关注列表

// 获取-用户粉丝列表

// 更新-用户个人资料

// 更新-用户照片资料

// 上传图片