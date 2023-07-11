import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { sidebarNavigation, SidebarNavigationItem } from './MenuItem';
import { Link, useLocation } from 'react-router-dom';
interface Sider {
  collapsed?: boolean;
}
const sidebarNavFlat = sidebarNavigation.reduce(
  (result: SidebarNavigationItem[], current) =>
    result.concat(
      current.children && current.children.length > 0
        ? current.children
        : current,
    ),
  [],
);
const Sider = ({ collapsed }: Sider) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const currentMenuItem = sidebarNavFlat.find(
    ({ url }) => url === location.pathname,
  );
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  const openedSubmenu = sidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => url === location.pathname),
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];
  return (
    <Layout.Sider style={{ background: colorBgContainer }} width={200} className='ml-6 overflow-hidden rounded-xl'>
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        style={{ height: '100%' }}
        items={sidebarNavigation.map(nav => {
          const isSubMenu = nav.children?.length;

          return {
            key: nav.key,
            title: nav.title,
            label: isSubMenu ? (
              nav.title
            ) : (
              <Link to={nav.url || ''}>{nav.title}</Link>
            ),
            icon: nav.icon,
            children:
              isSubMenu &&
              nav.children &&
              nav.children.map(childNav => ({
                key: childNav.key,
                label: <Link to={childNav.url || ''}>{childNav.title}</Link>,
                title: childNav.title,
              })),
          };
        })}
      />
    </Layout.Sider>
  );
};

export default Sider;
