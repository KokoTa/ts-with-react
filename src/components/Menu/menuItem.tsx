/*
 * @Author: KokoTa
 * @Date: 2021-04-25 18:03:48
 * @LastEditTime: 2021-04-28 14:45:09
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Menu/menuItem.tsx
 */

import classNames from "classnames";
import { useContext } from "react";
import { MenuContext } from "./menu";

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const {
    index,
    disabled,
    className,
    style,
    children
  } = props;

  const menuContext = useContext(MenuContext)
  const handleClick = () => {
    if (menuContext.onSelect && !disabled && typeof index === 'string') {
      menuContext.onSelect(index)
    }
  }

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': menuContext.index === index,
  })

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem