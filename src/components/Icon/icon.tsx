/*
 * @Author: KokoTa
 * @Date: 2021-04-29 11:47:23
 * @LastEditTime: 2021-05-17 14:10:33
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Icon/icon.tsx
 */

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// 添加图标
library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme
  })

  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
}

export default Icon
