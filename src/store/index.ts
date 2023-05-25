import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistedState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
const persisReducer = persistReducer<PersistedState>(
  persistConfig,
  rootReducer,
);
const store = configureStore({
  reducer: persisReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk],
});
const persistor = persistStore(store);

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
