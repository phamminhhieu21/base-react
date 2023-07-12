import { useSelector } from 'react-redux';
import { selectAuthUser } from 'store/reducers/auth.reducer';
import { isTokenExpired } from 'utils/checkExpireToken';
import { Modal } from 'antd';
import { useAppDispatch } from 'hooks/reduxHooks';
import { logOut } from 'store/reducers/auth.reducer';
export const ProtectedRoute = ({ children }: any) => {
  const dispatch = useAppDispatch();
  //check valid token and is authenticated
  const User: any = useSelector(selectAuthUser());
  if (!User?.isLoggedIn) {
    Modal.error({
      title: `${
       'You are not logged in yet'
      }`,
      content: 'Please log in again to continue using',
      onOk: () => {
        dispatch(logOut());
      },
    });
  }
  return children;
};
