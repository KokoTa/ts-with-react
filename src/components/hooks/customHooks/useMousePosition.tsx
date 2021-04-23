import { useEffect, useState } from "react"

/*
 * @Author: KokoTa
 * @Date: 2021-04-22 17:16:41
 * @LastEditTime: 2021-04-22 17:26:24
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/hooks/customHooks/useMousePosition.tsx
 */

// 自定义 hook 命名必须以 use 开头
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const positionHandle = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      setPosition({ x, y })
    }
    window.addEventListener('click', positionHandle)
    return () => {
      window.removeEventListener('click', positionHandle)
    }
  }, [])

  return position
}

export default useMousePosition