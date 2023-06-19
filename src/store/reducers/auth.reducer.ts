/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { loginSuccess, login, register as RegisterApi } from 'api/auth.api';
import { notification } from 'antd';
interface User {
  isLoggedIn: boolean;
  access_token: string | null;
  refreshToken: string | null;
  data: any;
  typeLogin: string | null;
}

interface AuthState {
  User: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  User: {
    isLoggedIn: false,
    access_token: null,
    refreshToken: null,
    data: null,
    typeLogin: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.User = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;
export const register = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resp: any = await RegisterApi({
      ...payload,
    });
    if (resp && resp.code !== 0) {
      dispatch(setLoading(false));
      notification.error({
        message: 'Đăng ký thất bại',
        description: resp.message,
      });
    }
    if (resp && resp.code === 0 && resp.access_token) {
      const payload = {
        isLoggedIn: false,
        access_token: resp.access_token,
        data: {
          email: resp.email,
        },
        typeLogin: null,
        refreshToken: null,
      };
      dispatch(setUser(payload));
      dispatch(setLoading(false));
      notification.success({
        message: 'Đăng ký thành công',
        description: resp.message,
      });
      if (resp && resp.access_token) {
        window.location.href = '/login';
      }
    }
  } catch (error: any) {
    dispatch(setLoading(false));
    notification.error({
      message: 'Đăng ký thất bại',
      description: error.message,
    });
  }
};
export const logIn =
  (
    userId?: string | undefined,
    tokenLogin?: string | undefined,
    type?: string,
    email?: string | undefined,
    password?: string | undefined,
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resp: any =
        type && type == 'google' && userId && tokenLogin
          ? await loginSuccess({
              idGoogle: userId,
              tokenLogin,
            })
          : await login({
              email,
              password,
            });

      if (resp && resp.code !== 0) {
        dispatch(setLoading(false));
        notification.error({
          message: 'Đăng nhập thất bại',
          description: resp.message,
        });
      }
      if (resp && resp.code === 0 && resp.access_token) {
        const payload = {
          isLoggedIn: resp.access_token ? true : false,
          access_token: resp.access_token,
          data: resp.data,
          typeLogin: resp.typeLogin,
          refreshToken: resp.typeLogin == 'normal' ? resp.refreshToken : null,
        };
        dispatch(setUser(payload));
        dispatch(setLoading(false));
        notification.success({
          message: 'Đăng nhập thành công',
          description: resp.message,
        });
        if (resp && resp.access_token && resp.typeLogin == 'normal') {
          window.location.href = '/';
        }
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      notification.error({
        message: 'Đăng nhập thất bại',
        description: error.message,
      });
    }
  };
export const logOut = () => (dispatch: any) => {
  dispatch(setUser(null));
  window.location.href = '/login';
};
// selectors
export const selectUser = () => (state: any) => state.auth.User;

export default authSlice.reducer;
