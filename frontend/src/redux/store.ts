import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']