import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/auth.reducer';
const HomePage = () => {
  const User: any = useSelector(selectUser());

  return <div>Hello {User ? User.data?.name : 'null'}</div>;
};
export default HomePage;
