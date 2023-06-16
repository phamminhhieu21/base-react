import axios from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from 'api/ApiError';
import { readToken } from 'services/localStorage.service';

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpApi.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${readToken()}`,
  };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: any) => {
  throw new ApiError<ApiErrorData>(
    error.response?.data.message || error.message,
    error.response?.data,
  );
});

export interface ApiErrorData {
  message: string;
}
