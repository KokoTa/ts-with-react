/*
 * @Author: KokoTa
 * @Date: 2021-05-10 13:49:35
 * @LastEditTime: 2021-05-12 16:50:59
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Input/input.tsx
 */

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import { ChangeEvent } from "react";
import Icon from "../Icon/icon";

// 由于接口中的 size 和 InputHTMLAttributes 的 size 有冲突，因此用 Omit 忽略 InputHTMLAttributes 的 size
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: 'lg' | 'sm';
  /**
   * Icon 名称
   */
  icon?: IconProp;
  /**
   * 前缀
   */
  prepend?: string | React.ReactElement;
  /**
   * 后缀
   */
  append?: string | React.ReactElement;
  /**
   * 改变事件
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * 输入框
 */
export const Input: React.FC<InputProps> = (props) => {
  // 取出属性
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    style,
    ...restProps
  } = props

  // 拼装 className
  const classes = classNames('input', className, {
    [`input-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append,
  })

  // 受控组件 value + onChange
  // 非受控组件 defaultValue + ref
  if ('value' in restProps) {
    // 删除 defaultValue，否则会有受控和非受控组件的错误
    delete restProps.defaultValue
    // 当 value 是空值时，需要赋予默认值，否则会有受控和非受控组件的错误
    if (restProps.value === null || restProps.value === undefined) restProps.value = ''
  }

  return (
    // 根据其他值来添加不同节点
    <div className={classes} style={style}>
      {prepend && <div className="input-group-prepend-item">{prepend}</div>}
      {icon && <div className="input-icon-wrapper">
        <Icon icon={icon}></Icon>
      </div>}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {append && <div className="input-group-append-item">{append}</div>}
    </div>
  )
}

export default Input