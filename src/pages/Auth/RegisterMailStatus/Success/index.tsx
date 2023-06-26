import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUser, verifyRegisterToken } from 'store/reducers/auth.reducer';
import { Button } from 'antd';
const RegisterMailConfirm = () => {
  const dispatch: any = useDispatch();
  const { token } = useParams();
  const user = useSelector(selectUser());
  // const isLoading = useSelector((state: any) => state.auth.isLoading);
  useEffect(() => {
    if (!token) return;
    dispatch(verifyRegisterToken(token as string));
  }, [token]);
  return (
    <div>
      {/* {isLoading && <div>Loading...</div>} */}
      {user && user.data ? (
        <>
          <h1>Thank you {user?.name}, you have successfully registered</h1>
          <h3>Please go to the Login page to log in and use the app</h3>
          <Button type="primary">
            <a href="/login">Login</a>
          </Button>
        </>
      ) : (
        <>
          <h1>Register Failed</h1>
          <h3>Please try again later or contact us for support!</h3>
          <Button type="primary">
            <a href="/register">Register</a>
          </Button>
        </>
      )}
    </div>
  );
};

export default RegisterMailConfirm;
