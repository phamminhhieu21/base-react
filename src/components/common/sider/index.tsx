import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import styled from 'styled-components';
import { items2, items } from './MenuItem';
interface Sider {
  collapsed?: boolean;
}
const Sider = ({ collapsed }: Sider) => {
  const Wrapped = styled.div``;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout.Sider style={{ background: colorBgContainer }} width={200}>
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
        items={items}
      />
    </Layout.Sider>
  );
};

export default Sider;
