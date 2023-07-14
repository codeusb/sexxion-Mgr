import { createSlice } from '@reduxjs/toolkit'
import { UserInfo } from './types'

let initialState: UserInfo = {
  id: '',
  photo: '',
  name: '',
  mobile: '',
  gender: 0, //用户性别
  birthday: '',
  intro: '', //用户介绍
}

const localInfo = localStorage.getItem('userInfo')

if (localInfo) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    initialState = JSON.parse(localStorage.getItem('userInfo')!)
  } catch {
    /* empty */
  }
}

const { reducer: UserInfoReducer, actions } = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setMyUserInfo(state, action) {
      Object.assign(state, action.payload)
    },
  },
})

export const { setMyUserInfo } = actions
export default UserInfoReducer
