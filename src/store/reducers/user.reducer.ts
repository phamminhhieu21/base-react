/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getUserCurrentApi, updateUserCurrentApi } from 'api/user.api';
import { notification } from 'antd';
import dayjs from 'dayjs';
interface userState {
  isLoading: boolean;
  data: {
    id: number | null;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    roleData: {
      id: number | null;
      code: string;
      value: string;
    };
    typeLogin: string;
    tokenLogin: string;
    date_of_birth: string;
    gender: string;
  };
}

const initialState: userState = {
  isLoading: false,
  data: {
    id: null,
    name: '',
    email: '',
    phone: '',
    avatar: '',
    roleData: {
      id: null,
      code: '',
      value: '',
    },
    typeLogin: '',
    tokenLogin: '',
    date_of_birth: '',
    gender: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileUser: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    updateProfileUser: (state, action: PayloadAction<any>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProfileUser, setLoading, updateProfileUser } =
  userSlice.actions;
export const loadProfileUserAction =
  (payload: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resp: any = await getUserCurrentApi(payload);
      if (resp && resp.err == 0) {
        dispatch(setLoading(false));
        dispatch(
          setProfileUser({
            ...resp.userData,
            // date_of_birth: dayjs(resp?.userData?.date_of_birth),
          }),
        );
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      notification.error({
        message: 'Get profile user fail',
        description: error.message,
      });
    }
  };

export const updateProfileUserAction =
  (payload: any) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resp: any = await updateUserCurrentApi(payload);
      if (resp && resp.err == 0) {
        dispatch(setLoading(false));
        notification.success({
          message: resp.message,
        });
        dispatch(
          updateProfileUser({
            ...resp.dataUpdate,
          }),
        );
      } else {
        dispatch(setLoading(false));
        notification.error({
          message: resp.message,
        });
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      notification.error({
        message: 'Fail',
        description: error.message,
      });
    }
  };

// selectors
export const selectProfileUser = () => (state: any) => state.user;

export default userSlice.reducer;
