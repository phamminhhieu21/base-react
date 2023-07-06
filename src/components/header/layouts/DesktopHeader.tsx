import React from 'react';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { HeaderSearch } from '../components/HeaderSearch/HeaderSearch';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import * as S from '../Header.styles';
import { BaseRow } from 'components/common/BaseRow/BaseRow';
import { BaseCol } from 'components/common/BaseCol/BaseCol';
import Logo from 'assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  isTwoColumnsLayout,
}) => {
  const navigate = useNavigate();
  const leftSide = isTwoColumnsLayout ? (
    <>
      <S.SearchColumn xl={16} xxl={17}>
        <BaseRow justify="space-between">
          <BaseCol xl={15} xxl={12}>
            <HeaderSearch />
          </BaseCol>
        </BaseRow>
      </S.SearchColumn>
    </>
  ) : (
    <>
      <BaseCol lg={10} xxl={8}>
        <HeaderSearch />
      </BaseCol>
    </>
  );

  return (
    <BaseRow justify="space-between" align="middle" className="pl-20">
      {/* {leftSide} */}
      <div
        style={{
          overflow: 'hidden',
        }}
      >
        <img
          src={Logo}
          alt="logo"
          className="w-[50px] h-[50px] object-cover cursor-pointer border-4  border-cyan-600 rounded-full"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <S.ProfileColumn
        xl={8}
        xxl={7}
        $isTwoColumnsLayout={isTwoColumnsLayout}
        className="py-3"
      >
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              <BaseCol>
                <NotificationsDropdown />
              </BaseCol>
              <BaseCol>
                <SettingsDropdown />
              </BaseCol>
            </BaseRow>
          </BaseCol>
          <BaseCol>
            <ProfileDropdown />
          </BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
