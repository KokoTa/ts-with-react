/*
 * @Author: KokoTa
 * @Date: 2021-05-11 17:20:35
 * @LastEditTime: 2021-05-11 18:08:01
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/hooks/useDebounce.tsx
 */

import { useEffect, useState } from "react"

const useDebounce = (value: any, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debounceValue
}

export default useDebounce