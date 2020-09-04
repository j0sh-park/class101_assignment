// @ts-ignore
import { combineReducers, createStore } from '@reduxjs/toolkit'
import shop from './shop'

const rootReducer = combineReducers({ shop })
const rootStore = createStore(rootReducer)
export default rootStore
export type RootState = ReturnType<typeof rootReducer>
