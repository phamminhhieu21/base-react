import React from 'react';
import { DesktopHeader } from './layouts/DesktopHeader';
import { MobileHeader } from './layouts/MobileHeader';
import { useResponsive } from 'hooks/useResponsive';

interface HeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
  isTwoColumnsLayout: boolean;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleSider,
  isSiderOpened,
  isTwoColumnsLayout,
  collapsed,
  setCollapsed,
}) => {
  const { isTablet } = useResponsive();

  return isTablet ? (
    <DesktopHeader isTwoColumnsLayout={isTwoColumnsLayout} />
  ) : (
    <MobileHeader toggleSider={toggleSider} isSiderOpened={isSiderOpened} />
  );
};
export default Header;
