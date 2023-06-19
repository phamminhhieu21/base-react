import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/auth.reducer';
import { isTokenAuthExpired } from 'utils/checkExpireToken';
import { Modal } from 'antd';

export const ProtectedRoute = ({ children }: any) => {
  //check valid token and is authenticated
  const User: any = useSelector(selectUser());
  const checkValidAuth =
    User?.isLoggedIn && isTokenAuthExpired(User?.access_token || null)
      ? false
      : true;

  if (!checkValidAuth) {
    Modal.error({
      title: 'Session has expired',
      content: 'Please log in again to continue using',
      onOk: () => {
        // localStorage.clear();
        window.location.href = '/login';
      },
    });
  }
  if (!User?.isLoggedIn) {
    Modal.warning({
      title: 'Warning',
      content: 'Please log in your account to using this function',
      onOk: () => {
        window.location.href = '/login';
      },
    });
  }
  return children;
};
