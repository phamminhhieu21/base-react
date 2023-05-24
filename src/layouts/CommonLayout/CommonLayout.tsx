import React, { useState } from 'react';
import { Header, Sider, Footer } from 'components/common';
import { Layout, theme, Breadcrumb } from 'antd';
import styled from 'styled-components';
import './CommonLayout.scss';
const CommonLayout = ({ children }: any) => {
  const WrappedContent = styled.div``;
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout id="common-layout">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider />
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer />
    </Layout>
  );
};
export default CommonLayout;
