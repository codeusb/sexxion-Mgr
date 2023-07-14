// 获取-用户个人资料

export interface userInfoRes {
  data: userInfoData
  message: string
}

export interface userInfoData {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: null
}
