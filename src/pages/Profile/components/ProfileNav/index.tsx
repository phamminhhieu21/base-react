import React from 'react';
import { useTranslation } from 'react-i18next';
import { profileNavData } from 'constants/profileNavData';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './ProfileNav.styles';
export interface ProfileNav {
  id: number;
}
const ProfileNav = ({ id }: ProfileNav) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <S.Wrapper>
      {profileNavData.map((item: any) => (
        <S.Btn
          key={item.id}
          icon={item.icon}
          type="text"
          color={item.color}
          onClick={() => navigate(`/user/profile/${id}/${item.href}`)}
          $isActive={`/user/profile/${id}/${item.href}` === location.pathname}
        >
          {t(item.name)}
        </S.Btn>
      ))}
    </S.Wrapper>
  );
};
export default ProfileNav;
