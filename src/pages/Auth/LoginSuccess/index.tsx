import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, selectUser } from 'store/reducers/auth.reducer';
const LoginSuccessPage = () => {
  const dispatch: any = useDispatch();
  const { tokenLogin, idGoogle } = useParams();
  console.log(tokenLogin, idGoogle);
  const User = useSelector(selectUser());
  console.log(User);
  useEffect(() => {
    dispatch(logIn(idGoogle, tokenLogin, 'google'));
  }, []);
  return (
    <div>
      {User?.isLoggedIn ? (
        <Navigate to={'/'} replace={true} />
      ) : (
        <div>Is logging...</div>
      )}
    </div>
  );
};

export default LoginSuccessPage;
