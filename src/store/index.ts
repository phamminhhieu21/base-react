import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers'
// import authReducer from './reducers/auth.reducer'
const store = configureStore({
  reducer: rootReducer
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
