import {
  ChangePasswordRequest,
  LoginRequest,
  LoginSuccessRequest,
  LoginSuccessResponse,
  NewPasswordData,
  RegisterRequest,
  SignUpRequest,
  VerifyRegisterTokenResponse,
  forgotPassword,
} from 'Models/auth.model';
import { httpApi } from 'api/http.api';

export const register = (registerPayload: RegisterRequest): Promise<any> =>
  httpApi
    .post<any>('/api/v1/auth/register', {
      ...registerPayload,
    })
    .then(resp => resp.data);

export const registerWithConfirmMailApi = (
  registerPayload: RegisterRequest,
): Promise<any> =>
  httpApi
    .post<any>('/api/v1/auth/register', {
      ...registerPayload,
    })
    .then(resp => resp.data);

export const verifyRegisterTokenApi = (
  token: string,
): Promise<VerifyRegisterTokenResponse> =>
  httpApi
    .post<VerifyRegisterTokenResponse>(
      `/api/v1/auth/register/confirm-mail/${token}`,
    )
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

export const forgotPasswordApi = (payload: forgotPassword): Promise<any> =>
  httpApi
    .post<any>('/api/v1/auth/forgot-password', {
      email: payload.email,
    })
    .then(resp => resp.data);

export const resetPasswordApi = (payload: NewPasswordData): Promise<any> =>
  httpApi
    .post<any>('/api/v1/auth/reset-password', payload)
    .then(resp => resp.data);

export const changePasswordApi = (
  payload: ChangePasswordRequest,
): Promise<any> =>
  httpApi
    .post<any>('/api/v1/auth/change-password', payload)
    .then(resp => resp.data);
