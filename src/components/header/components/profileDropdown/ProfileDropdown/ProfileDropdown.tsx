import React from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useResponsive } from 'hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { BasePopover } from 'components/common/BasePopover/BasePopover';
import { BaseCol } from 'components/common/BaseCol/BaseCol';
import { BaseRow } from 'components/common/BaseRow/BaseRow';
import { BaseAvatar } from 'components/common/BaseAvatar/BaseAvatar';
import { selectProfileUser } from 'store/reducers/user.reducer';
import { useSelector } from 'react-redux';
export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();
  const User: any = useSelector(selectProfileUser());
  return User ? (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        <BaseCol>
          <BaseAvatar
            src={User?.data?.avatar}
            alt="User"
            shape="circle"
            size={40}
          />
        </BaseCol>
        {isTablet && (
          <BaseCol>
            <span>{`${User.data?.name}`}</span>
          </BaseCol>
        )}
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};
