// @ts-ignore
import { combineReducers, createStore } from '@reduxjs/toolkit'
import auth from './auth'
import user from './user'

const rootReducer = combineReducers({ auth, user })
const rootStore = createStore(rootReducer)
export default rootStore
export type RootState = ReturnType<typeof rootReducer>
