import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/auth.reducer';
import { isTokenAuthExpired } from 'utils/checkExpireToken';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
export const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  //check valid token and is authenticated
  const User: any = useSelector(selectUser());
  const checkValidAuth =
    User?.isLoggedIn && isTokenAuthExpired(User?.access_token || null)
      ? false
      : true;
  if (!checkValidAuth) {
    // localStorage.removeItem('persist:root');
    Modal.error({
      title: 'Session has expired',
      content: 'Please log in again to continue using',
      onOk: () => {
        navigate('/login');
      },
    });
  }
  return children;
};
