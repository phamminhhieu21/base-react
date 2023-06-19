import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.reducer.ts';
import userReducer from './user.reducer.ts';
const rootReducer: any = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
