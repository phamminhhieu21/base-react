import React from 'react';
import { UploadOutlined, ExportOutlined } from '@ant-design/icons';
import { ReactComponent as NftIcon } from '@app/assets/icons/nft-icon.svg';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Upload',
    key: 'upload',
    url: '/media/upload',
    icon: <UploadOutlined />,
  },
  {
    title: 'Export',
    key: 'export',
    url: '/export',
    icon: <ExportOutlined />,
    // children: [
    //   {
    //     title: 'CSV',
    //     key: 'feed',
    //     url: '/export/csv',
    //   },
    // ],
  },
];
