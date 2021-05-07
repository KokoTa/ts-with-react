import classNames from "classnames";
import React from "react";

/*
 * @Author: KokoTa
 * @Date: 2021-04-23 18:19:21
 * @LastEditTime: 2021-05-07 15:47:16
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Button/button.tsx
 */
type ButtonSize = 'lg' | 'sm'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: ButtonSize;
  /**
   * 类型
   */
  btnType?: ButtonType;
  /**
   * 链接地址
   */
  href?: string;
  children: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// 这里用 Partial 是因为 Native 和 Anchor 有一方可能为必填
// 比如类型是 Native，但是因为是并集，Anchor 中如果有必填属性的话就必须填写
// 这里 Partial 把并集里的属性都设置为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 按钮
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    btnType,
    size,
    disabled,
    href,
    children,
    ...resetProps
  } = props;

  // btn, btn-lg, btn-primary...
  const classes = classNames('btn', className, {
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    'disabled': (btnType === 'link') && disabled // a 链接没有 disabled，需要特殊判断
  })

  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...resetProps}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...resetProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button