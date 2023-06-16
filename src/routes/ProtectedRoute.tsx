import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/auth.reducer';
import { isTokenFirebaseExpired } from 'utils/checkExpireToken';
export const ProtectedRoute = ({ children }: any) => {
  //check valid token and is authenticated
  const user: any = useSelector(selectUser());
  const checkValidAuth = !user && !user?.isLoggedIn ? false : true;
  if (!checkValidAuth) return <Navigate to="/login" />;
  return children;
};
