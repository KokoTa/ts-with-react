/*
 * @Author: KokoTa
 * @Date: 2021-04-30 15:18:32
 * @LastEditTime: 2021-05-06 10:47:02
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Transition/transition.tsx
 */

import CSSTransition, { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { TransitionActions } from "react-transition-group/Transition";

type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-left' | 'zoom-in-bottom'

type TransitionProps = CSSTransitionProps & TransitionActions & {
  animation?: AnimationName,
  wrapper?: boolean // 防止 transition 样式被覆盖，比如 Button 组件的过渡样式会覆盖 Transition 组件的过渡样式
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      { wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition