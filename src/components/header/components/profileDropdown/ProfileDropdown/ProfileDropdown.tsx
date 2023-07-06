import React, { useEffect } from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useResponsive } from 'hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { BasePopover } from 'components/common/BasePopover/BasePopover';
import { BaseCol } from 'components/common/BaseCol/BaseCol';
import { BaseRow } from 'components/common/BaseRow/BaseRow';
import { BaseAvatar } from 'components/common/BaseAvatar/BaseAvatar';
import { selectAuthUser } from 'store/reducers/auth.reducer';
import {
  selectProfileUser,
  loadProfileUserAction,
} from 'store/reducers/user.reducer';
import { useSelector } from 'react-redux';
export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();
  const { data }: any = useSelector(selectAuthUser());
  const { data: ProfileUser }: any = useSelector(selectProfileUser());
  useEffect(() => {
    if (data.id) {
      loadProfileUserAction(data.id);
    }
  }, [data]);
  return ProfileUser ? (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        <BaseCol>
          <BaseAvatar
            src={
              ProfileUser?.avatar ||
              'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
            }
            alt="Avatar user"
            shape="circle"
            size={40}
          />
        </BaseCol>
        {isTablet && (
          <BaseCol>
            <p className="text-sm text-slate-700">{`${ProfileUser?.name}`}</p>
          </BaseCol>
        )}
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};
