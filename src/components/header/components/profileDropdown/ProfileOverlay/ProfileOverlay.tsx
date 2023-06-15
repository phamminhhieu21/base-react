import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './ProfileOverlay.styles';
import { logOutWithGoogle } from 'store/reducers/auth.reducer';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
export const ProfileOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutWithGoogle());
  };
  return (
    <div {...props}>
      <S.Text>
        <Link to="/user/profile">{t('profile.title')}</Link>
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
