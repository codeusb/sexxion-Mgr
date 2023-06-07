import { createSlice } from '@reduxjs/toolkit'
import { IState } from './types'

const initialState: IState = {
  username: '',
  password: ''
}

export const loginSlice = createSlice(
  {
    name: 'login',
    initialState,
    reducers: {
      setUserState: (state: IState, action) =>{
        state.username = action.payload
      },
      setPasswordState: (state: IState, action) => {
        state.password = action.payload
      }
    }
  }
)

export const {
  setUserState,
  setPasswordState
} = loginSlice.actions

export default loginSlice.reducer