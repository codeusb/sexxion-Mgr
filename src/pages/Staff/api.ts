import {http} from "../../utils/http"
import { 
  getUserDatailRes,
  userFollowReq,
  userFollowRes,
  userFansReq,
  userFansRes,
  updateUserInfoReq,
  resData,
  } from './types'

// 获取-用户详细资料
export const getUserDatail = () =>
  http.get<getUserDatailRes,getUserDatailRes["data"]>("/user")
// 获取-用户关注列表
export const getUserFollow = (params:userFollowReq) =>
  http.get<userFollowRes,userFollowRes["data"]>("/user/followings",{params})
// 获取-用户粉丝列表
export const getUserFollowers = (params:userFansReq) =>
  http.get<userFansRes,userFansRes["data"]>("/user/followers",{params})
// 更新-用户个人资料
export const updateUserPro = (params:updateUserInfoReq) =>
  http.patch<resData,resData>("/user/profile",params)
// 更新-用户照片资料
export const updateUserPhoto = (params:FormData) =>
  http.patch<resData,resData>("/user/photo",params)
