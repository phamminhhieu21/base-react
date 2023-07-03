import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfileUser, loadProfileUserAction } from 'store/reducers/user.reducer';
import { selectAuthUser } from 'store/reducers/auth.reducer';
const HomePage = () => {
  const dispatch : any = useDispatch();
  const {data}: any = useSelector(selectAuthUser());
  const User: any = useSelector(selectProfileUser());
  useEffect(() => {
    if(data?.id){
      dispatch(loadProfileUserAction(data?.id));
    }
  }, [data]);

  return <div>Hello {User ? User.data?.name : 'null'}</div>;
};
export default HomePage;
