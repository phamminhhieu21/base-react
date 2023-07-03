import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserModel } from 'domain/UserModel';
import * as S from './styled';
import { BaseAvatar } from 'components/common/BaseAvatar/BaseAvatar';

interface ProfileInfoProps {
  profileData: {
    name: string;
    avatar : string;
  } | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const [fullness] = useState(90);

  const { t } = useTranslation();

  return profileData ? (
    <S.Wrapper>
      <S.ImgWrapper>
        <BaseAvatar shape="circle" src={profileData.avatar || 'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'} alt="Profile" />
      </S.ImgWrapper>
      <S.Title>{profileData.name}</S.Title>
      {/* <S.Subtitle>{profileData.name}</S.Subtitle> */}
      <S.FullnessWrapper>
        <S.FullnessLine width={fullness}>{fullness}%</S.FullnessLine>
      </S.FullnessWrapper>
      <S.Text>{t('profile.fullness')}</S.Text>
    </S.Wrapper>
  ) : null;
};
export default ProfileInfo;

