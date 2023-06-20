import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProfileUser } from 'store/reducers/user.reducer';
const HomePage = () => {
  const User: any = useSelector(selectProfileUser());

  return <div>Hello {User ? User.data?.name : 'null'}</div>;
};
export default HomePage;
