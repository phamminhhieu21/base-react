import React from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useResponsive } from 'hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { BasePopover } from 'components/common/BasePopover/BasePopover';
import { BaseCol } from 'components/common/BaseCol/BaseCol';
import { BaseRow } from 'components/common/BaseRow/BaseRow';
import { BaseAvatar } from 'components/common/BaseAvatar/BaseAvatar';
import { selectUser } from 'store/reducers/auth.reducer';
import { useSelector, useDispatch } from 'react-redux';
export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();

  const user: any = useSelector(selectUser());
  const dispatch: any = useDispatch();

  return user ? (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        <BaseCol>
          <BaseAvatar
            src={user?.photoUrl}
            alt="User"
            shape="circle"
            size={40}
          />
        </BaseCol>
        {isTablet && (
          <BaseCol>
            <span>{`${user?.access_token}`}</span>
          </BaseCol>
        )}
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};
