import { combineReducers, createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import shop from './shop'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ shop })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
