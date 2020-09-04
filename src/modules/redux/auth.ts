import { createSlice } from '@reduxjs/toolkit'
import cookie from 'js-cookie'

export interface AuthState {
  token:
    | {
        accessToken: string
        refreshToken: string
        expiresAt: Date
        tokenType: string
      }
    | undefined
}

const token = cookie.get('token')
const initialState: AuthState = {
  token: token ? JSON.parse(token) : undefined,
}

const authSlick = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.token = {
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        tokenType: action.payload.token_type,
        expiresAt: new Date(action.payload.expires_at),
      }
      if (state.token.accessToken != null) cookie.set('token', state.token)
    },
  },
})

export default authSlick.reducer
export const authActions = authSlick.actions
