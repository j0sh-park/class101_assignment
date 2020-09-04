import { createSlice } from '@reduxjs/toolkit'

export interface UserStore {
  me: {} | undefined
}

const initialState: UserStore = {
  me: undefined,
}

const userSlick = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMe: (state, action) => {
      state.me = action.payload
    },
  },
})

export default userSlick.reducer
export const userActions = userSlick.actions
