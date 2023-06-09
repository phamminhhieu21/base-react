export const persistToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const readToken = (type : string): string => {
  let token = '';
  const storageData = localStorage.getItem('persist:root');
  if (storageData) {
    const parsedData = JSON.parse(storageData);
    const authData = JSON.parse(parsedData.auth);
    token = type === 'refresh_token' ? authData.User?.refresh_token : authData.User?.access_token;
  }
  return token;
};

