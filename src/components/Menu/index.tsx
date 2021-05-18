/*
 * @Author: KokoTa
 * @Date: 2021-05-18 13:58:36
 * @LastEditTime: 2021-05-18 14:04:35
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Menu/index.tsx
 */
import { FC } from 'react'
import Menu, { IMenuProps } from './menu'
import MenuItem, { IMenuItemProps } from './menuItem'
import SubMenu, { ISubMenuProps } from './subMenu'

export type MenuComponentProps = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>
  SubMenu: FC<ISubMenuProps>
}

const MenuComponent = Menu as MenuComponentProps
MenuComponent.Item = MenuItem
MenuComponent.SubMenu = SubMenu

export default MenuComponent
