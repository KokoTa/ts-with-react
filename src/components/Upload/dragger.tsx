/*
 * @Author: KokoTa
 * @Date: 2021-05-17 11:17:32
 * @LastEditTime: 2021-05-17 11:50:31
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Upload/dragger.tsx
 */

import classNames from 'classnames'
import { DragEvent, useState } from 'react'

interface DraggerProps {
  onFile: (files: FileList) => void
}

export const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('dragger', {
    'is-dragover': dragOver
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile && onFile(e.dataTransfer.files)
  }

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
