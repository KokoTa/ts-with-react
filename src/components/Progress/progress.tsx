import { CSSProperties } from "react"
import { ThemeProps } from "../Icon/icon"

/*
 * @Author: KokoTa
 * @Date: 2021-05-14 15:34:10
 * @LastEditTime: 2021-05-14 17:13:17
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Progress/progress.tsx
 */
export interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: CSSProperties
  theme?: ThemeProps
}

export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props

  return (
    <div className="progress" style={styles}>
      <div className="progress-outer" style={{ height: `${strokeHeight}px` }}>
        <div className={`progress-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className="progress-text">{percent}%</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary'
}

export default Progress