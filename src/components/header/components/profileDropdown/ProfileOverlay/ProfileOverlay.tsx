import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './ProfileOverlay.styles';
import { logOut } from 'store/reducers/auth.reducer';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/auth.reducer';
export const ProfileOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const User = useSelector(selectUser());
  const handleLogOut = () => {
    dispatch(logOut(User?.data?.email));
  };
  return (
    <div {...props}>
      <S.Text>
        <Link to={`/user/profile/${User?.data?.id}`}>{t('profile.title')}</Link>
      </S.Text>
      <S.ItemsDivider />
      <S.Text>
        <Button type="primary" danger onClick={handleLogOut}>
          {t('header.logout')}
        </Button>
      </S.Text>
    </div>
  );
};
