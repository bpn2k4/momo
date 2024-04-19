import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
  user: string | null
}

const initialState: AuthState = {
  user: null
}

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: initialState,
  reducers: {

  }
})

export const authReducer = AuthSlice.reducer
export const { } = AuthSlice.actions