import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from 'store/reducers/auth.reducer';
const LoginSuccessPage = () => {
  const dispatch: any = useDispatch();
  const { tokenLogin, idGoogle } = useParams();
  console.log(tokenLogin, idGoogle);
  const { isLoggedIn } = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    dispatch(loginWithGoogle(idGoogle, tokenLogin));
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <Navigate to={'/'} replace={true} />
      ) : (
        <div>Yêu cầu bạn hãy đăng nhập</div>
      )}
    </div>
  );
};

export default LoginSuccessPage;
