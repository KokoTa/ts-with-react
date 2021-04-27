/*
 * @Author: KokoTa
 * @Date: 2021-04-25 18:03:44
 * @LastEditTime: 2021-04-26 10:42:13
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Menu/menu.tsx
 */

import classNames from "classnames";
import React, { createContext, useState } from "react";

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

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={menuContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu