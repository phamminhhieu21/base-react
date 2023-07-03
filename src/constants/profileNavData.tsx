import { BellOutlined, DollarOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

interface ProfileNavItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: 'primary' | 'error' | 'warning' | 'success';
  href: string;
}

export const profileNavData: ProfileNavItem[] = [
  {
    id: 1,
    name: 'Personal Info',
    icon: <UserOutlined />,
    color: 'primary',
    href: 'personal-info',
  },
  {
    id: 2,
    name: 'Security Settings',
    icon: <SecurityScanOutlined />,
    color: 'success',
    href: 'security-settings',
  },
];
