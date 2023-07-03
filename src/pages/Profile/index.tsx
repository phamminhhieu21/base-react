import React, { useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BaseCard } from 'components/common/BaseCard/BaseCard';
import { BaseButton } from 'components/common/BaseButton/BaseButton';
import ProfileInfo from './components/ProfileCard';
import { PageTitle } from 'components/common/PageTitle/PageTitle';
import ProfileNav from './components/ProfileNav';
import { useResponsive } from 'hooks/useResponsive';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks';
import { BaseRow } from 'components/common/BaseRow/BaseRow';
import { BaseCol } from 'components/common/BaseCol/BaseCol';
import {
  loadProfileUserAction,
  selectProfileUser,
} from 'store/reducers/user.reducer';

const ProfileLayout: React.FC = () => {
  const { idUser } = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectProfileUser());

  const { t } = useTranslation();
  const { isTablet: isTabletOrHigher, mobileOnly } = useResponsive();
  const location = useLocation();
  const navigate = useNavigate();

  const { isTablet } = useResponsive();

  const isTitleShown =
    isTabletOrHigher || (mobileOnly && location.pathname === '/profile');
  const isMenuShown =
    isTabletOrHigher || (mobileOnly && location.pathname !== '/profile');

  useEffect(() => {
    isTablet && location.pathname === '/profile' && navigate('personal-info');
  }, [isTablet, location.pathname, navigate]);

  useEffect(() => {
    if (idUser) {
      dispatch(loadProfileUserAction(idUser));
    }
  }, [idUser]);
  return (
    <>
      <PageTitle>{t('profile.title')}</PageTitle>
      {!isTitleShown && (
        <Btn
          icon={<LeftOutlined />}
          type="text"
          onClick={() => navigate('/profile')}
        >
          {t('common.back')}
        </Btn>
      )}

      <BaseRow gutter={[30, 30]}>
        {isTitleShown && (
          <BaseCol xs={24} md={24} xl={8}>
            <ProfileCard>
              <BaseRow gutter={[30, 30]}>
                <BaseCol xs={24} md={12} xl={24}>
                  <ProfileInfo
                    profileData={{
                      name: data?.name,
                      avatar: data?.avatar,
                    }}
                  />
                </BaseCol>
                <BaseCol xs={24} md={12} xl={24}>
                  <ProfileNav id={data.id} />
                </BaseCol>
              </BaseRow>
            </ProfileCard>
          </BaseCol>
        )}
        {isMenuShown && (
          <BaseCol xs={24} md={24} xl={16}>
            <Outlet />
          </BaseCol>
        )}
      </BaseRow>
    </>
  );
};

const ProfileCard = styled(BaseCard)`
  height: unset;
`;

const Btn = styled(BaseButton)`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  padding: 0;
  height: unset;
  color: var(--secondary-color);
`;

export default ProfileLayout;
