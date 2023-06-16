import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import firebase from 'services/firebase';
// import { AppDispatch, RootState } from '../index';
import { loginSuccess } from 'api/auth.api';
interface User {
  // id: string;
  // name: string;
  // email: string;
  // photoUrl: string;
  // idTokenFirebase: string;
  // isAuthenticated: boolean;
  isLoggedIn: boolean;
  access_token: string;
  data: any;
  typeLogin: string;
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
export const loginWithGoogle =
  (userId: string | undefined, tokenLogin: string | undefined) =>
  async (dispatch: any) => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // firebase
    //   .auth()
    //   .signInWithPopup(provider)
    //   .then(resp => {
    //     const user = {
    //       id: resp.user?.uid || '',
    //       name: resp.user?.displayName || '',
    //       email: resp.user?.email || '',
    //       photoUrl: resp.user?.photoURL || '',
    //       idTokenFirebase: nestedData(resp.credential) || '',
    //       isAuthenticated: true,
    //     };
    //     // save to store
    //     dispatch(setUser(user));
    //     // navigate to home
    //     window.location.href = '/';
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    const resp: any = await loginSuccess({
      idGoogle: userId,
      tokenLogin,
    });
    console.log(resp);
    const payload = {
      isLoggedIn: resp.access_token ? true : false,
      access_token: resp.access_token,
      data: resp.data,
      typeLogin: resp.typeLogin,
    };
    dispatch(setUser(payload));
  };
export const logOutWithGoogle = () => (dispatch: any) => {
  // firebase
  //   .auth()
  //   .signOut()
  //   .then(() => {
  //     // remove from store
  //     dispatch(setUser(null));
  //     // navigate to login
  //     window.location.href = '/login';
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
};
// selectors
export const selectUser = () => (state: any) => state.auth.user;

export default authSlice.reducer;
