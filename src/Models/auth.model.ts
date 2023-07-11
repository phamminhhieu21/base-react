export interface User {
  email: string
  id: string
  name: string
}

export interface UserModel {
  data: {
    id?: string;
    idGoogle?: string;
    email: string;
    name: string;
    avatar: string;
  };
  typeLogin: string;
  refreshToken?: string | null;
  access_token: string;
  isLoggedIn: boolean;
}

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

export interface NewPasswordData {
  token : string;
  newPassword: string;
}
export interface ChangePasswordRequest {
  id: string | undefined;
  oldPassword: string;
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
  gender?: string;
  phone_number?: string;
  date_of_birth?: string;
}
export interface VerifyRegisterTokenResponse {
  code: number;
  message: string;
  dataRegister: {
    email: string;
    name: string;
  };
}
export interface forgotPassword {
  email: string;
}