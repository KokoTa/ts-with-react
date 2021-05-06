/*
 * @Author: KokoTa
 * @Date: 2021-04-28 10:54:31
 * @LastEditTime: 2021-04-30 17:52:31
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Menu/subMenu.tsx
 */

import classNames from "classnames"
import React, { useContext, useState } from "react"
// import { CSSTransition } from "react-transition-group"
import Icon from "../Icon/icon"
import Transition from "../Transition/transition"
import { MenuContext } from "./menu"
import { IMenuItemProps } from "./menuItem"

export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<ISubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<String> // 是否默认显示子面板
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu', className, {
    'submenu-vertical-icon': context.mode === 'vertical',
    'submenu-vertical-icon-opened': menuOpen
  })

  // 控制子面板显示和隐藏
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  let timer: any = null
  const handleHover = (e: React.MouseEvent, isOpen: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(isOpen)
    }, 300)
  }
  const subMenuHandleEvent = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleHover(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleHover(e, false) },
  } : {}
  const subMenuTitleHandleEvent = context.mode !== 'horizontal' ? {
    onClick: (e: React.MouseEvent) => { handleClick(e) }
  } : {}

  // 渲染子面板
  const renderChildren = () => {
    const classes = classNames('submenu-item')
    const childrenElement =  React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error('Warning: SubMenu need MenuItem component as children')
      }
    })
    return (
      // <CSSTransition in={menuOpen} timeout={300} classNames="zoom-in-top" appear unmountOnExit>
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={classes}>
          {childrenElement}
        </ul>
      </Transition>
      // </CSSTransition>
    )
  }

  return (
    <li className={classes} {...subMenuHandleEvent}>
      <div className="submenu-title" {...subMenuTitleHandleEvent}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu