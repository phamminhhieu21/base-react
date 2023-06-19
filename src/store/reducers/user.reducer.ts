/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getUserCurrentApi } from 'api/user.api';
import { notification } from 'antd';

interface userState {
  isLoading: boolean;
  data: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role: {
      code: string;
      name: string;
    };
    typeLogin: string;
    date_of_birth: string;
    gender: string;
  };
}

const initialState: userState = {
  isLoading: false,
  data: {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    role: {
      code: '',
      name: '',
    },
    typeLogin: '',
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
      console.log('resp', resp);
      if (resp && resp.err == 0) {
        dispatch(setLoading(false));
        dispatch(
          setProfileUser({
            name: resp.userData.name,
            email: resp.userData.email,
            phone: resp.userData.phone,
            avatar: resp.userData.avatar,
            role: {
              code: resp.userData.roleData.code,
              name: resp.userData.roleData.value,
            },
            typeLogin: resp.userData.typeLogin,
            date_of_birth: resp.userData.date_of_birth,
            gender: resp.userData.gender,
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

// selectors
export const selectProfileUser = () => (state: any) => state.user;

export default userSlice.reducer;
