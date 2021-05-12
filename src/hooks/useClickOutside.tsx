/*
 * @Author: KokoTa
 * @Date: 2021-05-12 11:28:46
 * @LastEditTime: 2021-05-12 13:40:09
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/hooks/useClickOutside.tsx
 */
import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) return
      handler(e)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])

}

export default useClickOutside