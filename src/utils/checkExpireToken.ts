export function isTokenFirebaseExpired(token: string) {
  if (!token) return true;
  const decodedToken: any = JSON.parse(atob(token?.split('.')[1]));
  if (!decodedToken || !decodedToken.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}
