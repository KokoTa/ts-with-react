/*
 * @Author: KokoTa
 * @Date: 2021-04-25 18:03:44
 * @LastEditTime: 2021-04-28 10:35:12
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Menu/menu.tsx
 */

import classNames from "classnames";
import React, { createContext, useState } from "react";
import { IMenuItemProps } from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: number) => void;

export interface IMenuProps {
  defaultIndex?: number;
  className?:string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext =  createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<IMenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    children,
    onSelect
  } = props

  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const menuContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: (index: number) => {
      setCurrentActive(index)
      if (onSelect) onSelect(index)
    }
  }

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  })

  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      const { index } = childElement.props
      if (displayName === 'menu-item') {
        return React.cloneElement(childElement, { index: index ? index : i })
      } else {
        console.error('Warning: Menu need MenuItem component as children')
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
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu