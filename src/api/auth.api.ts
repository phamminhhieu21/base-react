import { httpApi } from 'api/http.api';
import { UserModel } from 'domain/UserModel';

export interface AuthData {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SecurityCodePayload {
  code: string;
}

export interface NewPasswordData {
  newPassword: string;
}

export interface LoginRequest {
  email: string | undefined;
  password: string | undefined;
}

export interface LoginResponse {
  token: string;
  user: UserModel;
}
export interface LoginSuccessRequest {
  idGoogle: string | undefined;
  tokenLogin: string | undefined;
}

export interface LoginSuccessResponse {
  code: number;
  message: string;
  access_token: string;
  refreshToken?: string;
  typeLogin: string;
  data: {
    id: string;
    idGoogle?: string;
    email: string;
    name: string;
    avatar: string;
  };
}
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  gender: string;
  phone_number: string;
  date_of_birth: string;
}
export const register = (registerPayload: RegisterRequest): Promise<any> =>
  httpApi
    .post<any>('/api/v1/auth/register', {
      ...registerPayload,
    })
    .then(resp => resp.data);
export const login = (
  loginPayload: LoginRequest,
): Promise<LoginSuccessResponse> =>
  httpApi
    .post<LoginSuccessResponse>('/api/v1/auth/login', { ...loginPayload })
    .then(resp => resp.data);

export const loginSuccess = (loginPayload: LoginSuccessRequest): Promise<any> =>
  httpApi
    .post<any>('/api/v1/auth/login-success/verify-profile', {
      ...loginPayload,
    })
    .then(resp => resp.data);

export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  httpApi.post<undefined>('signUp', { ...signUpData }).then(({ data }) => data);

export const resetPassword = (
  resetPasswordPayload: ResetPasswordRequest,
): Promise<undefined> =>
  httpApi
    .post<undefined>('forgotPassword', { ...resetPasswordPayload })
    .then(({ data }) => data);

export const setNewPassword = (
  newPasswordData: NewPasswordData,
): Promise<undefined> =>
  httpApi
    .post<undefined>('setNewPassword', { ...newPasswordData })
    .then(({ data }) => data);
