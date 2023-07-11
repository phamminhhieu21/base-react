import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth.reducer.ts';
import userReducer from './user.reducer.ts';
import tableCrud from './table.reducer.ts';
const rootReducer: any = combineReducers({
  auth: authReducer,
  user: userReducer,
  tableCrud : tableCrud,
});

export default rootReducer;
