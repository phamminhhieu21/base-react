import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/auth.reducer';
import { isTokenAuthExpired } from 'utils/checkExpireToken';
export const ProtectedRoute = ({ children }: any) => {
  //check valid token and is authenticated
  const User: any = useSelector(selectUser());
  console.log(User);
  const checkValidAuth =
    !User?.isLoggedIn &&
    isTokenAuthExpired(User?.access_token ? User?.access_token : null)
      ? false
      : true;
  console.log(checkValidAuth);
  if (!checkValidAuth) return <Navigate to="/login" />;
  return children;
};
