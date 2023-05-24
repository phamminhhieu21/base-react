import React from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
const MenuHeader = () => {
  const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`
  }))

  return <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']} items={items1} />
}
export default MenuHeader
