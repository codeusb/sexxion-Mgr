// 用户详细信息
export interface getUserDatailRes {
  data: userDetail
  message: string
}

export interface userDetail {
  id: string
  name: string
  photo: string
  intro: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}

// 关注列表
export interface userFollowReq {
  page?: string
  per_page?: string
}

export interface userFollowRes {
  data: {
    page: number
    per_page: number
    results: userCommonData[]
    total_count: number
  }
  message: string
}

export interface userCommonData {
  id: string
  name: string
  photo: string
  fans_count: number
  mutual_follow: boolean
}

//粉丝列表
export interface userFansReq {
  page?: string
  per_page?: string
}

export interface userFansRes {
  data: {
    page: number
    per_page: number
    results: userCommonData[]
    total_count: number
  }
  message: string
}

// 更新-用户个人资料
export interface updateUserInfoReq {
  name: string
  gender: number
  birthday: string
  real_name: string
  intro: string
}

export interface resData {
  data: null
  message: string
}

// 更新-用户照片
export interface updateUserPhotoReq {
  photo: any
}
