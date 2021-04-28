/*
 * @Author: KokoTa
 * @Date: 2021-04-25 18:03:44
 * @LastEditTime: 2021-04-28 15:04:11
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Menu/menu.tsx
 */

import classNames from "classnames";
import React, { createContext, useState } from "react";
import { IMenuItemProps } from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: string) => void;

export interface IMenuProps {
  defaultIndex?: string;
  className?:string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext =  createContext<IMenuContext>({ index: "0" })

const Menu: React.FC<IMenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    children,
    onSelect,
    defaultOpenSubMenus
  } = props

  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const menuContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: (index: string) => {
      setCurrentActive(index)
      if (onSelect) onSelect(index)
    },
    mode,
    defaultOpenSubMenus
  }

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: `${index}` })
      } else {
        console.error('Warning: Menu need MenuItem or SubMenu component as children')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={menuContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: "0",
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu