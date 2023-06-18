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
