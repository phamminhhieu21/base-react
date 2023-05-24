import React, { useState } from 'react';
import { Layout, Dropdown } from 'antd';
import MenuHeader from './Menu';
import type { MenuProps } from 'antd';
import styled from 'styled-components';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
export interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
const Header = ({ setCollapsed, collapsed }: HeaderProps) => {
  const Wrapped = styled.div`
    .ant-layout-header {
      background-color: #ffffff;
      justify-content: flex-end;
      box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
        rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
      .ant-space-compact-block {
        width: fit-content;
        /* background-color: #f58c80cc; */
        .ant-btn-compact-item {
          &:nth-child(2) {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #328af7f5;
            color: white;
          }
        }
      }
    }
  `;
  const { Header } = Layout;
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
  };

  const handleMenuClick: MenuProps['onClick'] = e => {
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: 'Log out',
      key: '2',
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Wrapped>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        {/* <MenuHeader /> */}
        <Dropdown.Button
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
        >
          User
        </Dropdown.Button>
      </Header>
    </Wrapped>
  );
};

export default Header;
