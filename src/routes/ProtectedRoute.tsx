import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from 'store/reducers/auth.reducer';
import { isTokenAuthExpired } from 'utils/checkExpireToken';
import { Modal } from 'antd';

export const ProtectedRoute = ({ children }: any) => {
  //check valid token and is authenticated
  const User: any = useSelector(selectAuthUser());
  const checkValidAuth =
    User?.isLoggedIn && isTokenAuthExpired(User?.access_token || null)
      ? false
      : true;

  if (!checkValidAuth || !User?.isLoggedIn) {
    Modal.error({
      title: `${
        !checkValidAuth ? 'Session has expired' : 'You are not logged in yet'
      }`,
      content: 'Please log in again to continue using',
      onOk: () => {
        // localStorage.clear();
        window.location.href = '/login';
      },
    });
  }
  return children;
};
