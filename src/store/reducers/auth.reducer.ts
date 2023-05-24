import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../index';
import firebase from 'services/firebase';
import { useNavigate } from 'react-router-dom';
interface User {
  id: string;
  name: string;
  email: string;
  idTokenFirebase: string;
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
export const loginWithGoogle = () => (dispatch: AppDispatch) => {
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
      };
      // save to local storage
      localStorage.setItem('user', JSON.stringify(user));
      // save to store
      dispatch(setUser(user));

      // navigate to home
      const navigate = useNavigate();
      navigate('/');
    })
    .catch(error => {
      console.log(error);
    });
};

// selectors
export const selectUser = () => (state: RootState) => state.auth.user;

export default authSlice.reducer;
