import axios from 'axios';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from 'api/ApiError';
import { notificationController } from 'controllers/notificationController';
import { store } from 'store';
import { logOut, setNewAccessToken } from 'store/reducers/auth.reducer';
import { sleep } from 'utils/helpers';
import { readToken } from 'utils/token';
import { refreshTokenApi } from './auth.api';
export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

export const httpUploadApi = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

httpUploadApi.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${readToken()}`,
    'Content-Type': 'multipart/form-data',
  };
  return config;
});
httpApi.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${readToken()}`,
    withCredentials: true,
  };

  return config;
});

httpApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    const originalConfig = error.config;
    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const res: any = await httpApi.post(
          `/api/v1/auth/refresh-token/${readToken('refresh_token')}`,
        );
        if (res && res.data.code == 0) {
          store.dispatch(setNewAccessToken(res.access_token));
          originalConfig.headers.Authorization = `Bearer ${res.data.access_token}`;
          console.log('originalConfig', originalConfig);
          return httpApi(originalConfig);
        } else {
          notificationController.error({
            message: res.data.message,
          });
          // await sleep(1000);
          // return store.dispatch(logOut());
        }
      } catch (error: any) {

        await sleep(1000);
        // return store.dispatch(logOut());
      }
    }
    throw new ApiError<ApiErrorData>(
      error.response?.data.message || error.message,
      error.response?.data,
    );
  },
);

export interface ApiErrorData {
  message: string;
}
