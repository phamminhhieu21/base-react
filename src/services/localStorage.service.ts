import { UserModel } from 'domain/UserModel';
const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + '/avatars/avatar5.webp';



export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (): string => {
  const storageData = localStorage.getItem('persist:root');
  let accessToken = '';
  if (storageData) {
    const parsedData = JSON.parse(storageData);
    const authData = JSON.parse(parsedData.auth);
    accessToken = authData.User?.access_token;
  }
  return accessToken;
};

export const persistUser = (user: UserModel): void => {
  localStorage.setItem('user', JSON.stringify(user));
};



export const deleteToken = (): void => localStorage.removeItem('accessToken');
export const deleteUser = (): void => localStorage.removeItem('user');
