import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import firebase from 'services/firebase';
// import { AppDispatch, RootState } from '../index';
interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  idTokenFirebase: string;
  isAuthenticated: boolean;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
const nestedData = (data: any) => {
  return data.idToken;
};
export const loginWithGoogle = () => (dispatch: any) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(resp => {
      const user = {
        id: resp.user?.uid || '',
        name: resp.user?.displayName || '',
        email: resp.user?.email || '',
        photoUrl: resp.user?.photoURL || '',
        idTokenFirebase: nestedData(resp.credential) || '',
        isAuthenticated: true,
      };
      // save to store
      dispatch(setUser(user));
      // navigate to home
      window.location.href = '/';
    })
    .catch(error => {
      console.log(error);
    });
};
export const logOutWithGoogle = () => (dispatch: any) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // remove from store
      dispatch(setUser(null));
      // navigate to login
      window.location.href = '/login';
    })
    .catch(error => {
      console.log(error);
    });
};
// selectors
export const selectUser = () => (state: any) => state.auth.user;

export default authSlice.reducer;
