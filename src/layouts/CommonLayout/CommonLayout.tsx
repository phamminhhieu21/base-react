import React, { useState, useEffect } from 'react';
import Header from 'components/header';
import Footer from 'components/footer';
import Sider from 'components/sider';
import { Layout, theme, Breadcrumb } from 'antd';
import styled from 'styled-components';
import './CommonLayout.scss';
import { useLocation } from 'react-router-dom';
import { useResponsive } from 'hooks/useResponsive';
const CommonLayout = ({ children }: any) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const WrappedContent = styled.div``;
  const { Content } = Layout;
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const { isDesktop } = useResponsive();
  const toggleSider = () => setSiderCollapsed(!siderCollapsed);
  useEffect(() => {
    // setIsTwoColumnsLayout([ ].includes(location.pathname) && isDesktop);
  }, [location.pathname, isDesktop]);
  return (
    <Layout id="common-layout">
      <Header
        toggleSider={toggleSider}
        isSiderOpened={!siderCollapsed}
        isTwoColumnsLayout={isTwoColumnsLayout}
      />
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
