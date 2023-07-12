/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import {
  loginSuccess,
  login,
  registerWithConfirmMailApi,
  forgotPasswordApi,
  resetPasswordApi,
  changePasswordApi,
} from 'api/auth.api';
import { notification, Modal } from 'antd';
import { notificationController } from 'controllers/notificationController';
import { refreshTokenApi } from 'api/auth.api';
interface User {
  isLoggedIn: boolean | null;
  access_token: string | null;
  refresh_token: string | null;
  data: any;
  typeLogin: string | null;
}

interface AuthState {
  User: User | any;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  User: {
    isLoggedIn: false,
    access_token: null,
    refresh_token: null,
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
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.User.access_token = action.payload;
    },
    setDataAfterLogout: state => {
      state.User = {
        typeLogin: null,
        access_token: null,
        refresh_token: null,
        isLoggedIn: false,
        data: {
          email: state.User?.data?.email,
        },
      };
    },
  },
});

export const { setUser, setLoading, setDataAfterLogout, setAccessToken } =
  authSlice.actions;

export const registerWithConfirmMail =
  (payload: any) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resp = await registerWithConfirmMailApi({
        ...payload,
      });
      if (resp && resp.code !== 0) {
        dispatch(setLoading(false));
        notification.error({
          message: 'Failed',
          description: resp.message,
        });
      } else {
        dispatch(setLoading(false));
        Modal.success({
          title: 'Successfull',
          content: resp.message,
          width: 500,
          centered: true,
        });
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      notification.error({
        message: 'Failed',
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
          refresh_token: resp.typeLogin == 'normal' ? resp.refresh_token : null,
        };
        dispatch(setUser(payload));
        dispatch(setLoading(false));
        notification.success({
          message: 'Đăng nhập thành công',
          description: resp.message,
        });
        if (resp && resp.access_token && resp.typeLogin == 'normal') {
          window.location.replace('/');
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
  dispatch(setDataAfterLogout());
  window.location.replace('/login');
};

export const forgotPasswordAction = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resp = await forgotPasswordApi(payload);
    if (resp && resp.code !== 0) {
      dispatch(setLoading(false));
      notification.error({
        message: 'Failed',
        description: resp.message,
      });
    } else {
      dispatch(setLoading(false));
      Modal.success({
        title: 'Successfull',
        content: resp.message,
        width: 500,
        centered: true,
      });
    }
  } catch (error: any) {
    dispatch(setLoading(false));
    notification.error({
      message: 'Failed',
      description: error.message,
    });
  }
};

export const resetPasswordAction = (payload: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resp: any = await resetPasswordApi(payload);
    if (resp && resp.code !== 0) {
      dispatch(setLoading(false));
      notification.error({
        message: 'Failed',
        description: resp.message,
      });
    } else {
      dispatch(setLoading(false));
      Modal.success({
        title: 'Successfull',
        content: resp.message,
        width: 500,
        centered: true,
        onOk: () => {
          window.location.href = '/login';
        },
      });
    }
  } catch (error: any) {
    dispatch(setLoading(false));
    notification.error({
      message: 'Failed',
      description: error.message,
    });
  }
};

export const changePasswordAction =
  (payload: {
    id: string | undefined;
    oldPassword: string;
    newPassword: string;
  }) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resp: any = await changePasswordApi(payload);
      if (resp && resp.code !== 0) {
        dispatch(setLoading(false));
        notificationController.error({
          message: resp.message,
        });
      } else {
        dispatch(setLoading(false));
        notificationController.success({
          message: resp.message,
        });
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      notificationController.error({
        message: error.message,
      });
    }
  };

export const setNewAccessToken = (payload: string) => async (dispatch: any) => {
  if (payload) {
    dispatch(setAccessToken(payload));
  }
};

// selectors
export const selectAuthUser = () => (state: any) => state.auth.User;
export default authSlice.reducer;
