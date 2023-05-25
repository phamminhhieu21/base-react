import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.reducer.ts';

const rootReducer: any = combineReducers({
  auth: authReducer,
});

export default rootReducer;
