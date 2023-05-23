import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../index'
import firebase from 'services/firebase'

interface User {
  id: string
  name: string
  email: string
  // Thêm các thông tin người dùng khác tùy theo yêu cầu
}

interface AuthState {
  user: User | null
  // Thêm các trạng thái xác thực khác tùy theo yêu cầu
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: Boolean(localStorage.getItem('user'))
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    }
    // Thêm các reducers khác liên quan đến xác thực nếu cần
  }
})

export const { setUser } = authSlice.actions

export const loginWithGoogle = () => (dispatch: AppDispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(resp => {
      const user = {
        id: resp.user?.uid || '',
        name: resp.user?.displayName || '',
        email: resp.user?.email || ''
        // Các thông tin khác
      }
      // Lưu thông tin người dùng vào localStorage

      // Lưu thông tin người dùng vào Redux
      dispatch(setUser(user))
      // window.location.href = '/'
    })
    .catch(error => {
      console.log(error)
    })
}

// selectors
export const selectUser = () => (state: RootState) => state.auth.user

export default authSlice.reducer
