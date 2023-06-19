/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getUserCurrentApi, updateUserCurrentApi } from 'api/user.api';
import { notification } from 'antd';
import moment from 'moment';
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

export const { setProfileUser, setLoading } = userSlice.actions;
export const getProfileUserAction =
  (payload: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resp: any = await getUserCurrentApi(payload);
      if (resp && resp.err == 0) {
        dispatch(setLoading(false));
        dispatch(
          setProfileUser({
            ...resp.userData,
            date_of_birth: moment(resp?.userData?.date_of_birth).format(
              'YYYY/MM/DD',
            ),
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
          message: 'Update success',
        });
        dispatch(
          setProfileUser({
            ...resp.dataUpdate,
          }),
        );
      } else {
        dispatch(setLoading(false));
        notification.error({
          message: 'Update fail',
          description: resp.message,
        });
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      notification.error({
        message: 'Update fail',
        description: error.message,
      });
    }
  };

// selectors
export const selectProfileUser = () => (state: any) => state.user;

export default userSlice.reducer;
